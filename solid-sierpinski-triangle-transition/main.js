(function () {
  'use strict';

  let taskIdCounter = 1,
      isCallbackScheduled = false,
      isPerformingWork = false,
      taskQueue = [],
      currentTask = null,
      shouldYieldToHost = null,
      yieldInterval = 5,
      deadline = 0,
      maxYieldInterval = 300,
      scheduleCallback = null,
      scheduledCallback = null;
  const maxSigned31BitInt = 1073741823;
  function setupScheduler() {
    const channel = new MessageChannel(),
          port = channel.port2;
    scheduleCallback = () => port.postMessage(null);
    channel.port1.onmessage = () => {
      if (scheduledCallback !== null) {
        const currentTime = performance.now();
        deadline = currentTime + yieldInterval;
        const hasTimeRemaining = true;
        try {
          const hasMoreWork = scheduledCallback(hasTimeRemaining, currentTime);
          if (!hasMoreWork) {
            scheduledCallback = null;
          } else port.postMessage(null);
        } catch (error) {
          port.postMessage(null);
          throw error;
        }
      }
    };
    if (navigator && navigator.scheduling && navigator.scheduling.isInputPending) {
      const scheduling = navigator.scheduling;
      shouldYieldToHost = () => {
        const currentTime = performance.now();
        if (currentTime >= deadline) {
          if (scheduling.isInputPending()) {
            return true;
          }
          return currentTime >= maxYieldInterval;
        } else {
          return false;
        }
      };
    } else {
      shouldYieldToHost = () => performance.now() >= deadline;
    }
  }
  function enqueue(taskQueue, task) {
    function findIndex() {
      let m = 0;
      let n = taskQueue.length - 1;
      while (m <= n) {
        const k = n + m >> 1;
        const cmp = task.expirationTime - taskQueue[k].expirationTime;
        if (cmp > 0) m = k + 1;else if (cmp < 0) n = k - 1;else return k;
      }
      return m;
    }
    taskQueue.splice(findIndex(), 0, task);
  }
  function requestCallback(fn, options) {
    if (!scheduleCallback) setupScheduler();
    let startTime = performance.now(),
        timeout = maxSigned31BitInt;
    if (options && options.timeout) timeout = options.timeout;
    const newTask = {
      id: taskIdCounter++,
      fn,
      startTime,
      expirationTime: startTime + timeout
    };
    enqueue(taskQueue, newTask);
    if (!isCallbackScheduled && !isPerformingWork) {
      isCallbackScheduled = true;
      scheduledCallback = flushWork;
      scheduleCallback();
    }
    return newTask;
  }
  function flushWork(hasTimeRemaining, initialTime) {
    isCallbackScheduled = false;
    isPerformingWork = true;
    try {
      return workLoop(hasTimeRemaining, initialTime);
    } finally {
      currentTask = null;
      isPerformingWork = false;
    }
  }
  function workLoop(hasTimeRemaining, initialTime) {
    let currentTime = initialTime;
    currentTask = taskQueue[0] || null;
    while (currentTask !== null) {
      if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
        break;
      }
      const callback = currentTask.fn;
      if (callback !== null) {
        currentTask.fn = null;
        const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
        callback(didUserCallbackTimeout);
        currentTime = performance.now();
        if (currentTask === taskQueue[0]) {
          taskQueue.shift();
        }
      } else taskQueue.shift();
      currentTask = taskQueue[0] || null;
    }
    return currentTask !== null;
  }

  const equalFn = (a, b) => a === b;
  const signalOptions = {
    equals: equalFn
  };
  let runEffects = runQueue;
  const NOTPENDING = {};
  const STALE = 1;
  const PENDING = 2;
  const UNOWNED = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
  };
  const [transPending, setTransPending] = /*@__PURE__*/createSignal(false);
  var Owner = null;
  let Transition = null;
  let Listener = null;
  let Pending = null;
  let Updates = null;
  let Effects = null;
  let ExecCount = 0;
  function createRoot(fn, detachedOwner) {
    detachedOwner && (Owner = detachedOwner);
    const listener = Listener,
          owner = Owner,
          root = fn.length === 0 && !false ? UNOWNED : {
      owned: null,
      cleanups: null,
      context: null,
      owner
    };
    Owner = root;
    Listener = null;
    let result;
    try {
      runUpdates(() => result = fn(() => cleanNode(root)), true);
    } finally {
      Listener = listener;
      Owner = owner;
    }
    return result;
  }
  function createSignal(value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const s = {
      value,
      observers: null,
      observerSlots: null,
      pending: NOTPENDING,
      comparator: options.equals || undefined
    };
    return [readSignal.bind(s), value => {
      if (typeof value === "function") {
        if (Transition && Transition.running && Transition.sources.has(s)) value = value(s.pending !== NOTPENDING ? s.pending : s.tValue);else value = value(s.pending !== NOTPENDING ? s.pending : s.value);
      }
      return writeSignal(s, value);
    }];
  }
  function createComputed(fn, value, options) {
    updateComputation(createComputation(fn, value, true));
  }
  function createRenderEffect(fn, value, options) {
    updateComputation(createComputation(fn, value, false));
  }
  function createMemo(fn, value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const c = createComputation(fn, value, true);
    c.pending = NOTPENDING;
    c.observers = null;
    c.observerSlots = null;
    c.state = 0;
    c.comparator = options.equals || undefined;
    updateComputation(c);
    return readSignal.bind(c);
  }
  function batch(fn) {
    if (Pending) return fn();
    let result;
    const q = Pending = [];
    try {
      result = fn();
    } finally {
      Pending = null;
    }
    runUpdates(() => {
      for (let i = 0; i < q.length; i += 1) {
        const data = q[i];
        if (data.pending !== NOTPENDING) {
          const pending = data.pending;
          data.pending = NOTPENDING;
          writeSignal(data, pending);
        }
      }
    }, false);
    return result;
  }
  function untrack(fn) {
    let result,
        listener = Listener;
    Listener = null;
    result = fn();
    Listener = listener;
    return result;
  }
  function onCleanup(fn) {
    if (Owner === null) ;else if (Owner.cleanups === null) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
    return fn;
  }
  function useTransition() {
    return [transPending, (fn, cb) => {
      if (SuspenseContext) {
        Transition || (Transition = {
          sources: new Set(),
          effects: [],
          promises: new Set(),
          disposed: new Set(),
          tasks: new Set(),
          running: true,
          cb: []
        });
        cb && Transition.cb.push(cb);
        Transition.running = true;
      }
      batch(fn);
      if (!SuspenseContext && cb) cb();
    }];
  }
  function resumeEffects(e) {
    Transition && (Transition.running = true);
    Effects.push.apply(Effects, e);
    e.length = 0;
  }
  function createContext(defaultValue) {
    const id = Symbol("context");
    return {
      id,
      Provider: createProvider(id),
      defaultValue
    };
  }
  function useContext(context) {
    return lookup(Owner, context.id) || context.defaultValue;
  }
  function children(fn) {
    const children = createMemo(fn);
    return createMemo(() => resolveChildren(children()));
  }
  let SuspenseContext;
  function getSuspenseContext() {
    return SuspenseContext || (SuspenseContext = createContext({}));
  }
  function readSignal() {
    if (this.state && this.sources) {
      const updates = Updates;
      Updates = null;
      this.state === STALE ? updateComputation(this) : lookDownstream(this);
      Updates = updates;
    }
    if (Listener) {
      const sSlot = this.observers ? this.observers.length : 0;
      if (!Listener.sources) {
        Listener.sources = [this];
        Listener.sourceSlots = [sSlot];
      } else {
        Listener.sources.push(this);
        Listener.sourceSlots.push(sSlot);
      }
      if (!this.observers) {
        this.observers = [Listener];
        this.observerSlots = [Listener.sources.length - 1];
      } else {
        this.observers.push(Listener);
        this.observerSlots.push(Listener.sources.length - 1);
      }
    }
    if (Transition && Transition.running && Transition.sources.has(this)) return this.tValue;
    return this.value;
  }
  function writeSignal(node, value, isComp) {
    if (node.comparator) {
      if (Transition && Transition.running && Transition.sources.has(node)) {
        if (node.comparator(node.tValue, value)) return value;
      } else if (node.comparator(node.value, value)) return value;
    }
    if (Pending) {
      if (node.pending === NOTPENDING) Pending.push(node);
      node.pending = value;
      return value;
    }
    if (Transition) {
      if (Transition.running || !isComp && Transition.sources.has(node)) {
        Transition.sources.add(node);
        node.tValue = value;
      }
      if (!Transition.running) node.value = value;
    } else node.value = value;
    if (node.observers && (!Updates || node.observers.length)) {
      runUpdates(() => {
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          if (Transition && Transition.running && Transition.disposed.has(o)) continue;
          if (o.observers && o.state !== PENDING) markUpstream(o);
          o.state = STALE;
          if (o.pure) Updates.push(o);else Effects.push(o);
        }
        if (Updates.length > 10e5) {
          Updates = [];
          if (false) ;
          throw new Error();
        }
      }, false);
    }
    return value;
  }
  function updateComputation(node) {
    if (!node.fn) return;
    cleanNode(node);
    const owner = Owner,
          listener = Listener,
          time = ExecCount;
    Listener = Owner = node;
    runComputation(node, node.value, time);
    if (Transition && !Transition.running && Transition.sources.has(node)) {
      Transition.running = true;
      runComputation(node, node.tValue, time);
      Transition.running = false;
    }
    Listener = listener;
    Owner = owner;
  }
  function runComputation(node, value, time) {
    let nextValue;
    try {
      nextValue = node.fn(value);
    } catch (err) {
      handleError(err);
    }
    if (!node.updatedAt || node.updatedAt <= time) {
      if (node.observers && node.observers.length) {
        writeSignal(node, nextValue, true);
      } else if (Transition && Transition.running && node.pure) {
        Transition.sources.add(node);
        node.tValue = nextValue;
      } else node.value = nextValue;
      node.updatedAt = time;
    }
  }
  function createComputation(fn, init, pure, options) {
    const c = {
      fn,
      state: STALE,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: init,
      owner: Owner,
      context: null,
      pure
    };
    if (Owner === null) ;else if (Owner !== UNOWNED) {
      if (Transition && Transition.running && Owner.pure) {
        if (!Owner.tOwned) Owner.tOwned = [c];else Owner.tOwned.push(c);
      } else {
        if (!Owner.owned) Owner.owned = [c];else Owner.owned.push(c);
      }
    }
    return c;
  }
  function runTop(node) {
    if (node.state !== STALE) return;
    if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
    const ancestors = [node],
          runningTransition = Transition && Transition.running;
    while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
      if (runningTransition && Transition.disposed.has(node)) return;
      if (node.state === STALE || node.state === PENDING) ancestors.push(node);
    }
    for (let i = ancestors.length - 1; i >= 0; i--) {
      node = ancestors[i];
      if (runningTransition) {
        let top = node,
            prev = ancestors[i + 1];
        while ((top = top.owner) && top !== prev) {
          if (Transition.disposed.has(top)) return;
        }
      }
      if (node.state === STALE) {
        updateComputation(node);
      } else if (node.state === PENDING) {
        const updates = Updates;
        Updates = null;
        lookDownstream(node);
        Updates = updates;
      }
    }
  }
  function runUpdates(fn, init) {
    if (Updates) return fn();
    let wait = false;
    if (!init) Updates = [];
    if (Effects) wait = true;else Effects = [];
    ExecCount++;
    try {
      fn();
    } catch (err) {
      handleError(err);
    } finally {
      completeUpdates(wait);
    }
  }
  function completeUpdates(wait) {
    if (Updates) {
      if (Transition && Transition.running) scheduleQueue(Updates);else runQueue(Updates);
      Updates = null;
    }
    if (wait) return;
    let cbs;
    if (Transition && Transition.running) {
      if (Transition.promises.size || Transition.tasks.size) {
        Transition.running = false;
        Transition.effects.push.apply(Transition.effects, Effects);
        Effects = null;
        setTransPending(true);
        return;
      }
      const sources = Transition.sources;
      cbs = Transition.cb;
      Transition = null;
      batch(() => {
        sources.forEach(v => {
          v.value = v.tValue;
          if (v.owned) {
            for (let i = 0, len = v.owned.length; i < len; i++) cleanNode(v.owned[i]);
          }
          if (v.tOwned) v.owned = v.tOwned;
          delete v.tValue;
          delete v.tOwned;
        });
        setTransPending(false);
      });
    }
    if (Effects.length) batch(() => {
      runEffects(Effects);
      Effects = null;
    });else {
      Effects = null;
    }
    if (cbs) cbs.forEach(cb => cb());
  }
  function runQueue(queue) {
    for (let i = 0; i < queue.length; i++) runTop(queue[i]);
  }
  function scheduleQueue(queue) {
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      const tasks = Transition.tasks;
      let task;
      tasks.add(task = requestCallback(() => {
        tasks.delete(task);
        runUpdates(() => {
          Transition.running = true;
          runTop(item);
          if (!tasks.size) {
            Effects.push.apply(Effects, Transition.effects);
            Transition.effects = [];
          }
        }, false);
        Transition && (Transition.running = false);
      }));
    }
  }
  function lookDownstream(node) {
    node.state = 0;
    for (let i = 0; i < node.sources.length; i += 1) {
      const source = node.sources[i];
      if (source.sources) {
        if (source.state === STALE) runTop(source);else if (source.state === PENDING) lookDownstream(source);
      }
    }
  }
  function markUpstream(node) {
    for (let i = 0; i < node.observers.length; i += 1) {
      const o = node.observers[i];
      if (!o.state) {
        o.state = PENDING;
        o.observers && markUpstream(o);
      }
    }
  }
  function cleanNode(node) {
    let i;
    if (node.sources) {
      while (node.sources.length) {
        const source = node.sources.pop(),
              index = node.sourceSlots.pop(),
              obs = source.observers;
        if (obs && obs.length) {
          const n = obs.pop(),
                s = source.observerSlots.pop();
          if (index < obs.length) {
            n.sourceSlots[s] = index;
            obs[index] = n;
            source.observerSlots[index] = s;
          }
        }
      }
    }
    if (Transition && Transition.running && node.pure) {
      if (node.tOwned) {
        for (i = 0; i < node.tOwned.length; i++) cleanNode(node.tOwned[i]);
        delete node.tOwned;
      }
      reset(node, true);
    } else if (node.owned) {
      for (i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);
      node.owned = null;
    }
    if (node.cleanups) {
      for (i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
      node.cleanups = null;
    }
    node.state = 0;
    node.context = null;
  }
  function reset(node, top) {
    if (!top) {
      node.state = 0;
      Transition.disposed.add(node);
    }
    if (node.owned) {
      for (let i = 0; i < node.owned.length; i++) reset(node.owned[i]);
    }
  }
  function handleError(err) {
    throw err;
  }
  function lookup(owner, key) {
    return owner && (owner.context && owner.context[key] || owner.owner && lookup(owner.owner, key));
  }
  function resolveChildren(children) {
    if (typeof children === "function" && !children.length) return resolveChildren(children());
    if (Array.isArray(children)) {
      const results = [];
      for (let i = 0; i < children.length; i++) {
        const result = resolveChildren(children[i]);
        Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
      }
      return results;
    }
    return children;
  }
  function createProvider(id) {
    return function provider(props) {
      let res;
      createComputed(() => res = untrack(() => {
        Owner.context = {
          [id]: props.value
        };
        return children(() => props.children);
      }));
      return res;
    };
  }

  function createComponent(Comp, props) {
    return untrack(() => Comp(props));
  }

  const SuspenseListContext = createContext();
  function Suspense(props) {
    let counter = 0,
        showContent,
        showFallback;
    const [inFallback, setFallback] = createSignal(false),
          SuspenseContext = getSuspenseContext(),
          store = {
      increment: () => {
        if (++counter === 1) setFallback(true);
      },
      decrement: () => {
        if (--counter === 0) setFallback(false);
      },
      inFallback,
      effects: [],
      resolved: false
    };
    const listContext = useContext(SuspenseListContext);
    if (listContext) [showContent, showFallback] = listContext.register(store.inFallback);
    return createComponent(SuspenseContext.Provider, {
      value: store,
      get children() {
        const rendered = untrack(() => props.children);
        return createMemo(() => {
          const inFallback = store.inFallback(),
                visibleContent = showContent ? showContent() : true,
                visibleFallback = showFallback ? showFallback() : true;
          if (!inFallback && visibleContent) {
            store.resolved = true;
            resumeEffects(store.effects);
            return rendered;
          }
          if (!visibleFallback) return;
          return props.fallback;
        });
      }
    });
  }

  function reconcileArrays(parentNode, a, b) {
    let bLength = b.length,
        aEnd = a.length,
        bEnd = bLength,
        aStart = 0,
        bStart = 0,
        after = a[aEnd - 1].nextSibling,
        map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
        continue;
      }
      while (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
        while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart])) parentNode.removeChild(a[aStart]);
          aStart++;
        }
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = a[--aEnd].nextSibling;
        parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
        parentNode.insertBefore(b[--bEnd], node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = new Map();
          let i = bStart;
          while (i < bEnd) map.set(b[i], i++);
        }
        const index = map.get(a[aStart]);
        if (index != null) {
          if (bStart < index && index < bEnd) {
            let i = aStart,
                sequence = 1,
                t;
            while (++i < aEnd && i < bEnd) {
              if ((t = map.get(a[i])) == null || t !== index + sequence) break;
              sequence++;
            }
            if (sequence > index - bStart) {
              const node = a[aStart];
              while (bStart < index) parentNode.insertBefore(b[bStart++], node);
            } else parentNode.replaceChild(b[bStart++], a[aStart++]);
          } else aStart++;
        } else parentNode.removeChild(a[aStart++]);
      }
    }
  }
  function render(code, element, init) {
    let disposer;
    createRoot(dispose => {
      disposer = dispose;
      insert(element, code(), element.firstChild ? null : undefined, init);
    });
    return () => {
      disposer();
      element.textContent = "";
    };
  }
  function template(html, check, isSVG) {
    const t = document.createElement("template");
    t.innerHTML = html;
    let node = t.content.firstChild;
    if (isSVG) node = node.firstChild;
    return node;
  }
  function insert(parent, accessor, marker, initial) {
    if (marker !== undefined && !initial) initial = [];
    if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
    createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
  }
  function insertExpression(parent, value, current, marker, unwrapArray) {
    while (typeof current === "function") current = current();
    if (value === current) return current;
    const t = typeof value,
          multi = marker !== undefined;
    parent = multi && current[0] && current[0].parentNode || parent;
    if (t === "string" || t === "number") {
      if (t === "number") value = value.toString();
      if (multi) {
        let node = current[0];
        if (node && node.nodeType === 3) {
          node.data = value;
        } else node = document.createTextNode(value);
        current = cleanChildren(parent, current, marker, node);
      } else {
        if (current !== "" && typeof current === "string") {
          current = parent.firstChild.data = value;
        } else current = parent.textContent = value;
      }
    } else if (value == null || t === "boolean") {
      current = cleanChildren(parent, current, marker);
    } else if (t === "function") {
      createRenderEffect(() => {
        let v = value();
        while (typeof v === "function") v = v();
        current = insertExpression(parent, v, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];
      if (normalizeIncomingArray(array, value, unwrapArray)) {
        createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
        return () => current;
      }
      if (array.length === 0) {
        current = cleanChildren(parent, current, marker);
        if (multi) return current;
      } else {
        if (Array.isArray(current)) {
          if (current.length === 0) {
            appendNodes(parent, array, marker);
          } else reconcileArrays(parent, current, array);
        } else if (current == null || current === "") {
          appendNodes(parent, array);
        } else {
          reconcileArrays(parent, multi && current || [parent.firstChild], array);
        }
      }
      current = array;
    } else if (value instanceof Node) {
      if (Array.isArray(current)) {
        if (multi) return current = cleanChildren(parent, current, marker, value);
        cleanChildren(parent, current, null, value);
      } else if (current == null || current === "" || !parent.firstChild) {
        parent.appendChild(value);
      } else parent.replaceChild(value, parent.firstChild);
      current = value;
    } else ;
    return current;
  }
  function normalizeIncomingArray(normalized, array, unwrap) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i],
          t;
      if (item instanceof Node) {
        normalized.push(item);
      } else if (item == null || item === true || item === false) ; else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item) || dynamic;
      } else if ((t = typeof item) === "string") {
        normalized.push(document.createTextNode(item));
      } else if (t === "function") {
        if (unwrap) {
          while (typeof item === "function") item = item();
          dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else normalized.push(document.createTextNode(item.toString()));
    }
    return dynamic;
  }
  function appendNodes(parent, array, marker) {
    for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
  }
  function cleanChildren(parent, current, marker, replacement) {
    if (marker === undefined) return parent.textContent = "";
    const node = replacement || document.createTextNode("");
    if (current.length) {
      let inserted = false;
      for (let i = current.length - 1; i >= 0; i--) {
        const el = current[i];
        if (node !== el) {
          const isParent = el.parentNode === parent;
          if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);else isParent && parent.removeChild(el);
        } else inserted = true;
      }
    } else parent.insertBefore(node, marker);
    return [node];
  }

  const _tmpl$ = template(`<div class="container"></div>`),
        _tmpl$2 = template(`<div class="dot"> </div>`);
  const TARGET = 25;

  const TriangleDemo = () => {
    const [elapsed, setElapsed] = createSignal(0),
          [seconds, setSeconds] = createSignal(0),
          [, startTransition] = useTransition(),
          scale = createMemo(() => {
      const e = elapsed() / 1000 % 10;
      return 1 + (e > 5 ? 10 - e : e) / 10;
    }),
          start = Date.now(),
          t = setInterval(() => startTransition(() => setSeconds(seconds() % 10 + 1)), 1000);
    let f;

    const update = () => {
      setElapsed(Date.now() - start);
      f = requestAnimationFrame(update);
    };

    f = requestAnimationFrame(update);
    onCleanup(() => {
      clearInterval(t), cancelAnimationFrame(f);
    });
    return (() => {
      const _el$ = _tmpl$.cloneNode(true);

      insert(_el$, createComponent(Suspense, {
        get children() {
          return createComponent(Triangle, {
            x: 0,
            y: 0,
            s: 1000,
            seconds: seconds
          });
        }

      }));

      createRenderEffect(() => _el$.style.setProperty("transform", "scaleX(" + scale() / 2.1 + ") scaleY(0.7) translateZ(0.1px)"));

      return _el$;
    })();
  };

  const Triangle = ({
    x,
    y,
    s,
    seconds
  }) => {
    if (s <= TARGET) {
      return createComponent(Dot, {
        x: x - TARGET / 2,
        y: y - TARGET / 2,
        s: TARGET,
        text: seconds
      });
    }

    s = s / 2;
    const slow = createMemo(() => {
      var e = performance.now() + 0.8; // Artificially long execution time.

      while (performance.now() < e) {}

      return seconds();
    });
    return [createComponent(Triangle, {
      x: x,
      y: y - s / 2,
      s: s,
      seconds: slow
    }), createComponent(Triangle, {
      x: x - s,
      y: y + s / 2,
      s: s,
      seconds: slow
    }), createComponent(Triangle, {
      x: x + s,
      y: y + s / 2,
      s: s,
      seconds: slow
    })];
  };

  const Dot = ({
    x,
    y,
    s,
    text
  }) => {
    const [hover, setHover] = createSignal(false),
          onEnter = () => setHover(true),
          onExit = () => setHover(false);

    return (() => {
      const _el$2 = _tmpl$2.cloneNode(true),
            _el$3 = _el$2.firstChild;

      _el$2.addEventListener("mouseleave", onExit);

      _el$2.addEventListener("mouseenter", onEnter);

      _el$2.style.setProperty("width", s + "px");

      _el$2.style.setProperty("height", s + "px");

      _el$2.style.setProperty("left", x + "px");

      _el$2.style.setProperty("top", y + "px");

      _el$2.style.setProperty("border-radius", s / 2 + "px");

      _el$2.style.setProperty("line-height", s + "px");

      createRenderEffect(_p$ => {
        const _v$ = hover() ? "#ff0" : "#61dafb",
              _v$2 = hover() ? "**" + text() + "**" : text();

        _v$ !== _p$._v$ && _el$2.style.setProperty("background", _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (_el$3.data = _p$._v$2 = _v$2);
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined
      });

      return _el$2;
    })();
  };

  render(TriangleDemo, document.body);

}());
