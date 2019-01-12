(function () {
    'use strict';

    // Public interface
    var S = function S(fn, value) {
        var node = new ComputationNode(fn, value);
        return function computation() {
            return node.current();
        };
    };
    // compatibility with commonjs systems that expect default export to be at require('s.js').default rather than just require('s-js')
    Object.defineProperty(S, 'default', { value: S });
    S.root = function root(fn) {
        var owner = Owner, root = fn.length === 0 ? UNOWNED : new ComputationNode(null, null), result = undefined, disposer = fn.length === 0 ? null : function _dispose() {
            if (RunningClock !== null) {
                RootClock.disposes.add(root);
            }
            else {
                dispose(root);
            }
        };
        Owner = root;
        if (RunningClock === null) {
            result = topLevelRoot(fn, disposer, owner);
        }
        else {
            result = disposer === null ? fn() : fn(disposer);
            Owner = owner;
        }
        return result;
    };
    function topLevelRoot(fn, disposer, owner) {
        try {
            return disposer === null ? fn() : fn(disposer);
        }
        finally {
            Owner = owner;
        }
    }
    S.on = function on(ev, fn, seed, onchanges) {
        if (Array.isArray(ev))
            ev = callAll(ev);
        onchanges = !!onchanges;
        return S(on, seed);
        function on(value) {
            var running = RunningNode;
            ev();
            if (onchanges)
                onchanges = false;
            else {
                RunningNode = null;
                value = fn(value);
                RunningNode = running;
            }
            return value;
        }
    };
    function callAll(ss) {
        return function all() {
            for (var i = 0; i < ss.length; i++)
                ss[i]();
        };
    }
    S.effect = function effect(fn, value) {
        new ComputationNode(fn, value);
    };
    S.data = function data(value) {
        var node = new DataNode(value);
        return function data(value) {
            if (arguments.length === 0) {
                return node.current();
            }
            else {
                return node.next(value);
            }
        };
    };
    S.value = function value(current, eq) {
        var data = S.data(current), age = -1;
        return function value(update) {
            if (arguments.length === 0) {
                return data();
            }
            else {
                var same = eq ? eq(current, update) : current === update;
                if (!same) {
                    var time = RootClock.time;
                    if (age === time)
                        throw new Error("conflicting values: " + update + " is not the same as " + current);
                    age = time;
                    current = update;
                    data(update);
                }
                return update;
            }
        };
    };
    S.freeze = function freeze(fn) {
        var result = undefined;
        if (RunningClock !== null) {
            result = fn();
        }
        else {
            RunningClock = RootClock;
            RunningClock.changes.reset();
            try {
                result = fn();
                event();
            }
            finally {
                RunningClock = null;
            }
        }
        return result;
    };
    S.sample = function sample(fn) {
        var result, running = RunningNode;
        if (running !== null) {
            RunningNode = null;
            result = fn();
            RunningNode = running;
        }
        else {
            result = fn();
        }
        return result;
    };
    S.cleanup = function cleanup(fn) {
        if (Owner !== null) {
            if (Owner.cleanups === null)
                Owner.cleanups = [fn];
            else
                Owner.cleanups.push(fn);
        }
        else {
            console.warn("cleanups created without a root or parent will never be run");
        }
    };
    // experimental : exposing node constructors and some state
    S.makeDataNode = function makeDataNode(value) {
        return new DataNode(value);
    };
    S.makeComputationNode = function makeComputationNode(fn, seed) {
        return new ComputationNode(fn, seed);
    };
    S.isFrozen = function isFrozen() {
        return RunningClock !== null;
    };
    S.isListening = function isListening() {
        return RunningNode !== null;
    };
    // Internal implementation
    /// Graph classes and operations
    var Clock = /** @class */ (function () {
        function Clock() {
            this.time = 0;
            this.changes = new Queue(); // batched changes to data nodes
            this.updates = new Queue(); // computations to update
            this.disposes = new Queue(); // disposals to run after current batch of updates finishes
        }
        return Clock;
    }());
    var RootClockProxy = {
        time: function () { return RootClock.time; }
    };
    var DataNode = /** @class */ (function () {
        function DataNode(value) {
            this.value = value;
            this.pending = NOTPENDING;
            this.log = null;
        }
        DataNode.prototype.current = function () {
            if (RunningNode !== null) {
                logDataRead(this, RunningNode);
            }
            return this.value;
        };
        DataNode.prototype.next = function (value) {
            if (RunningClock !== null) {
                if (this.pending !== NOTPENDING) { // value has already been set once, check for conflicts
                    if (value !== this.pending) {
                        throw new Error("conflicting changes: " + value + " !== " + this.pending);
                    }
                }
                else { // add to list of changes
                    this.pending = value;
                    RootClock.changes.add(this);
                }
            }
            else { // not batching, respond to change now
                if (this.log !== null) {
                    this.pending = value;
                    RootClock.changes.add(this);
                    event();
                }
                else {
                    this.value = value;
                }
            }
            return value;
        };
        DataNode.prototype.clock = function () {
            return RootClockProxy;
        };
        return DataNode;
    }());
    var ComputationNode = /** @class */ (function () {
        function ComputationNode(fn, value) {
            this.state = CURRENT;
            this.source1 = null;
            this.source1slot = 0;
            this.sources = null;
            this.sourceslots = null;
            this.log = null;
            this.owned = null;
            this.cleanups = null;
            this.fn = fn;
            this.value = value;
            this.age = RootClock.time;
            if (fn === null)
                return;
            var owner = Owner, running = RunningNode;
            if (owner === null)
                console.warn("computations created without a root or parent will never be disposed");
            Owner = RunningNode = this;
            if (RunningClock === null) {
                toplevelComputation(this);
            }
            else {
                this.value = this.fn(this.value);
            }
            if (owner && owner !== UNOWNED) {
                if (owner.owned === null)
                    owner.owned = [this];
                else
                    owner.owned.push(this);
            }
            Owner = owner;
            RunningNode = running;
        }
        ComputationNode.prototype.current = function () {
            if (RunningNode !== null) {
                if (this.age === RootClock.time) {
                    if (this.state === RUNNING)
                        throw new Error("circular dependency");
                    else
                        updateNode(this); // checks for state === STALE internally, so don't need to check here
                }
                logComputationRead(this, RunningNode);
            }
            return this.value;
        };
        ComputationNode.prototype.clock = function () {
            return RootClockProxy;
        };
        return ComputationNode;
    }());
    var Log = /** @class */ (function () {
        function Log() {
            this.node1 = null;
            this.node1slot = 0;
            this.nodes = null;
            this.nodeslots = null;
        }
        return Log;
    }());
    var Queue = /** @class */ (function () {
        function Queue() {
            this.items = [];
            this.count = 0;
        }
        Queue.prototype.reset = function () {
            this.count = 0;
        };
        Queue.prototype.add = function (item) {
            this.items[this.count++] = item;
        };
        Queue.prototype.run = function (fn) {
            var items = this.items;
            for (var i = 0; i < this.count; i++) {
                fn(items[i]);
                items[i] = null;
            }
            this.count = 0;
        };
        return Queue;
    }());
    // Constants
    var NOTPENDING = {}, CURRENT = 0, STALE = 1, RUNNING = 2;
    // "Globals" used to keep track of current system state
    var RootClock = new Clock(), RunningClock = null, // currently running clock 
    RunningNode = null, // currently running computation
    Owner = null, // owner for new computations
    UNOWNED = new ComputationNode(null, null);
    // Functions
    function logRead(from, to) {
        var fromslot, toslot = to.source1 === null ? -1 : to.sources === null ? 0 : to.sources.length;
        if (from.node1 === null) {
            from.node1 = to;
            from.node1slot = toslot;
            fromslot = -1;
        }
        else if (from.nodes === null) {
            from.nodes = [to];
            from.nodeslots = [toslot];
            fromslot = 0;
        }
        else {
            fromslot = from.nodes.length;
            from.nodes.push(to);
            from.nodeslots.push(toslot);
        }
        if (to.source1 === null) {
            to.source1 = from;
            to.source1slot = fromslot;
        }
        else if (to.sources === null) {
            to.sources = [from];
            to.sourceslots = [fromslot];
        }
        else {
            to.sources.push(from);
            to.sourceslots.push(fromslot);
        }
    }
    function logDataRead(data, to) {
        if (data.log === null)
            data.log = new Log();
        logRead(data.log, to);
    }
    function logComputationRead(node, to) {
        if (node.log === null)
            node.log = new Log();
        logRead(node.log, to);
    }
    function event() {
        // b/c we might be under a top level S.root(), have to preserve current root
        var owner = Owner;
        RootClock.updates.reset();
        RootClock.time++;
        try {
            run(RootClock);
        }
        finally {
            RunningClock = RunningNode = null;
            Owner = owner;
        }
    }
    function toplevelComputation(node) {
        RunningClock = RootClock;
        RootClock.changes.reset();
        RootClock.updates.reset();
        try {
            node.value = node.fn(node.value);
            if (RootClock.changes.count > 0 || RootClock.updates.count > 0) {
                RootClock.time++;
                run(RootClock);
            }
        }
        finally {
            RunningClock = Owner = RunningNode = null;
        }
    }
    function run(clock) {
        var running = RunningClock, count = 0;
        RunningClock = clock;
        clock.disposes.reset();
        // for each batch ...
        while (clock.changes.count !== 0 || clock.updates.count !== 0 || clock.disposes.count !== 0) {
            if (count > 0) // don't tick on first run, or else we expire already scheduled updates
                clock.time++;
            clock.changes.run(applyDataChange);
            clock.updates.run(updateNode);
            clock.disposes.run(dispose);
            // if there are still changes after excessive batches, assume runaway            
            if (count++ > 1e5) {
                throw new Error("Runaway clock detected");
            }
        }
        RunningClock = running;
    }
    function applyDataChange(data) {
        data.value = data.pending;
        data.pending = NOTPENDING;
        if (data.log)
            markComputationsStale(data.log);
    }
    function markComputationsStale(log) {
        var node1 = log.node1, nodes = log.nodes;
        // mark all downstream nodes stale which haven't been already
        if (node1 !== null)
            markNodeStale(node1);
        if (nodes !== null) {
            for (var i = 0, len = nodes.length; i < len; i++) {
                markNodeStale(nodes[i]);
            }
        }
    }
    function markNodeStale(node) {
        var time = RootClock.time;
        if (node.age < time) {
            node.age = time;
            node.state = STALE;
            RootClock.updates.add(node);
            if (node.owned !== null)
                markOwnedNodesForDisposal(node.owned);
            if (node.log !== null)
                markComputationsStale(node.log);
        }
    }
    function markOwnedNodesForDisposal(owned) {
        for (var i = 0; i < owned.length; i++) {
            var child = owned[i];
            child.age = RootClock.time;
            child.state = CURRENT;
            if (child.owned !== null)
                markOwnedNodesForDisposal(child.owned);
        }
    }
    function updateNode(node) {
        if (node.state === STALE) {
            var owner = Owner, running = RunningNode;
            Owner = RunningNode = node;
            node.state = RUNNING;
            cleanup(node, false);
            node.value = node.fn(node.value);
            node.state = CURRENT;
            Owner = owner;
            RunningNode = running;
        }
    }
    function cleanup(node, final) {
        var source1 = node.source1, sources = node.sources, sourceslots = node.sourceslots, cleanups = node.cleanups, owned = node.owned, i, len;
        if (cleanups !== null) {
            for (i = 0; i < cleanups.length; i++) {
                cleanups[i](final);
            }
            node.cleanups = null;
        }
        if (owned !== null) {
            for (i = 0; i < owned.length; i++) {
                dispose(owned[i]);
            }
            node.owned = null;
        }
        if (source1 !== null) {
            cleanupSource(source1, node.source1slot);
            node.source1 = null;
        }
        if (sources !== null) {
            for (i = 0, len = sources.length; i < len; i++) {
                cleanupSource(sources.pop(), sourceslots.pop());
            }
        }
    }
    function cleanupSource(source, slot) {
        var nodes = source.nodes, nodeslots = source.nodeslots, last, lastslot;
        if (slot === -1) {
            source.node1 = null;
        }
        else {
            last = nodes.pop();
            lastslot = nodeslots.pop();
            if (slot !== nodes.length) {
                nodes[slot] = last;
                nodeslots[slot] = lastslot;
                if (lastslot === -1) {
                    last.source1slot = slot;
                }
                else {
                    last.sourceslots[lastslot] = slot;
                }
            }
        }
    }
    function dispose(node) {
        node.fn = null;
        node.log = null;
        cleanup(node, true);
    }

    const SNODE = Symbol('solid-node'),
      SPROXY = Symbol('solid-proxy');

    const proxyTraps = {
      get(target, property) {
        if (property === '_state') return target;
        const value = target[property],
          wrappable = isWrappable(value);
        if (S.isListening() && typeof value !== 'function') {
          let nodes, node;
          if (wrappable && (nodes = getDataNodes(value))) {
            node = nodes._self || (nodes._self = S.makeDataNode());
            node.current();
          }
          nodes = getDataNodes(target);
          node = nodes[property] || (nodes[property] = S.makeDataNode());
          node.current();
        }
        return wrappable ? wrap(value) : value;
      },

      set() { return true; },

      deleteProperty() { return true; }
    };

    function wrap(value) { return value[SPROXY] || (value[SPROXY] = new Proxy(value, proxyTraps)); }

    function isWrappable(obj) { return obj !== null && typeof obj === 'object' && !(obj instanceof Element); }

    function unwrap(item) {
      let result, unwrapped, v;
      if (result = (item != null) && item._state) return result;
      if (!isWrappable(item)) return item;

      if (Array.isArray(item)) {
        if (Object.isFrozen(item)) item = item.slice(0);
        for (let i = 0, l = item.length; i < l; i++) {
          v = item[i];
          if ((unwrapped = unwrap(v)) !== v) item[i] = unwrapped;
        }
      } else {
        if (Object.isFrozen(item)) item = Object.assign({}, item);
        let keys = Object.keys(item);
        for (let i = 0, l = keys.length; i < l; i++) {
          v = item[keys[i]];
          if ((unwrapped = unwrap(v)) !== v) item[keys[i]] = unwrapped;
        }
      }
      return item;
    }

    function getDataNodes(target) {
      let nodes = target[SNODE];
      if (!nodes) target[SNODE] = nodes = {};
      return nodes;
    }

    function setProperty(state, property, value, force) {
      value = unwrap(value);
      if (!force && state[property] === value) return;
      const notify = Array.isArray(state) || !(property in state);
      if (value === void 0) {
        delete state[property];
      } else state[property] = value;
      let nodes = getDataNodes(state), node;
      (node = nodes[property]) && node.next();
      notify && (node = nodes._self) && node.next();
    }

    function mergeState(state, value) {
      const keys = Object.keys(value) || [];
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        setProperty(state, key, value[key]);
      }
    }

    function updatePath(current, path, traversed = []) {
      if (path.length === 1) {
        let value = path[0];
        if (typeof value === 'function') {
          value = value(wrap(current), traversed);
          // reconciled
          if (value === undefined) return;
        }
        return mergeState(current, value);
      }

      const part = path.shift(),
        partType = typeof part,
        isArray = Array.isArray(current);

      if (Array.isArray(part)) {
        // Ex. update('data', [2, 23], 'label', l => l + ' !!!');
        for (let i = 0; i < part.length; i++)
          updatePath(current, [part[i]].concat(path), traversed.concat([part[i]]));
      } else if (isArray && partType === 'function') {
        // Ex. update('data', i => i.id === 42, 'label', l => l + ' !!!');
        for (let i = 0; i < current.length; i++)
          if (part(current[i], i)) updatePath(current[i], path.slice(0), traversed.concat([i]));
      } else if (isArray && partType === 'object') {
        // Ex. update('data', { from: 3, to: 12, by: 2 }, 'label', l => l + ' !!!');
        const {from = 0, to = current.length - 1, by = 1} = part;
        for (let i = from; i <= to; i += by)
          updatePath(current[i], path.slice(0), traversed.concat([i]));
      } else if (isArray && part === '*') {
        // Ex. update('data', '*', 'label', l => l + ' !!!');
        for (let i = 0; i < current.length; i++)
          updatePath(current, [i].concat(path), traversed.concat([i]));
      } else if (path.length === 1) {
        let value = path[0];
        if (typeof value === 'function') {
          const currentPart = current[part];
          value = value(isWrappable(currentPart) ? wrap(currentPart) : currentPart, traversed.concat([part]));
        }
        if (isWrappable(current[part]) && isWrappable(value) && !Array.isArray(value))
          return mergeState(current[part], value);
        return setProperty(current, part, value);
      } else updatePath(current[part], path, traversed.concat([part]));
    }

    function useState(state) {
      state = unwrap(state);
      const wrappedState = wrap(state);
      return [wrappedState, setState];

      function setState() {
        const args = arguments;
        S.freeze(() => {
          if (Array.isArray(args[0])) {
            for (let i = 0; i < args.length; i += 1)
              updatePath(state, args[i]);
          } else updatePath(state, Array.prototype.slice.call(args));
        });
      }
    }

    const DEFAULT = 'default',
      MERGE = 'merge',
      FORCE = 'force';

    function applyState(target, parent, property, mode, key) {
      let previous = parent[property], force = mode === FORCE;
      if (!force && target === previous) return;

      if (!isWrappable(target) || (previous == null)) {
        return (force || target !== previous) && setProperty(parent, property, target, force);
      }

      if (Array.isArray(target)) {
        if (target.length && previous.length && (mode === DEFAULT
          || (key && mode === MERGE && target[0][key] != null))) {
          // skip common prefix and suffix
          let i, j, start, end, newEnd, item, newIndicesNext, keyVal,
            temp = new Array(target.length),
            newIndices = new Map();
          for (start = 0, end = Math.min(previous.length, target.length); start < end && (previous[start] === target[start] || key && previous[start][key] === target[start][key]); start++)
            applyState(target[start], previous, start, mode, key);
          for (end = previous.length - 1, newEnd = target.length - 1; end >= 0 && newEnd >= 0 &&  (previous[end] === target[newEnd] || key && previous[end][key] === target[newEnd][key]); end--, newEnd--)
            temp[newEnd] = previous[end];
          // prepare a map of all indices in target
          newIndicesNext = new Array(newEnd + 1);
          for (j = newEnd; j >= start; j--) {
            item = target[j];
            keyVal = key ? item[key] : item;
            i = newIndices.get(keyVal);
            newIndicesNext[j] = i === undefined ? -1 : i;
            newIndices.set(keyVal, j);
          }
          // step through all old items to check reuse
          for (i = start; i <= end; i++) {
            item = previous[i];
            keyVal = key ? item[key] : item;
            j = newIndices.get(keyVal);
            if (j !== undefined && j !== -1) {
              temp[j] = previous[i];
              j = newIndicesNext[j];
              newIndices.set(keyVal, j);
            }
          }
          // set all the new values
          for (j = start; j < target.length; j++) {
            if (temp.hasOwnProperty(j)) {
              setProperty(previous, j, temp[j]);
              applyState(target[j], previous, j, mode, key);
            }
            else setProperty(previous, j, target[j]);
          }
        } else {
          for (let i = 0, len = target.length; i < len; i++) {
            applyState(target[i], previous, i, mode, key);
          }
        }
        if (previous.length > target.length) setProperty(previous, 'length', target.length);
        return;
      }

      const targetKeys = Object.keys(target);
      for (let i = 0, len = targetKeys.length; i < len; i++) {
        applyState(target[targetKeys[i]], previous, targetKeys[i], mode, key);
      }
      const previousKeys = Object.keys(previous);
      for (let i = 0, len = previousKeys.length; i < len; i++) {
        if (target[previousKeys[i]] === undefined) setProperty(previous, previousKeys[i], undefined);
      }
    }

    // Diff method for setState
    function reconcile(path, options = {}) {
      let value;
      if (Array.isArray(path)) {
        value = path.pop();
      } else if (typeof path === 'object') {
        value = path;
        path = undefined;
      } else {
        path = Array.prototype.slice.call(arguments, 0, -1),
        value = arguments[arguments.length - 1];
        options = {};
      }
      const mode = options.mode !== undefined ? options.mode : DEFAULT,
        key = options.key !== undefined ? options.key : 'id';
      return state => {
        state = unwrap(state);
        if (path) {
          for (let i = 0; i < path.length - 1; i += 1) state = state[path[i]];
          applyState(value, state, path[path.length - 1], mode, key);
        } else applyState(value, { state }, 'state', mode, key);
      }
    }

    const { root, cleanup: useCleanup, sample, freeze } = S;

    const GROUPING = '__recGroup',
      FORWARD = 'nextSibling',
      BACKWARD = 'previousSibling';

    function prepNodes(node, id) {
      if (node.nodeType === 11) {
        let mark = node.firstChild;
        while(mark) {
          mark[GROUPING] = id;
          mark = mark.nextSibling;
        }
      } else node[GROUPING] = id;
      return node;
    }

    function step(node, direction) {
      const key = node[GROUPING];
      while(node[direction] && node[direction][GROUPING] === key) node = node[direction];
      return node[direction];
    }

    function removeNodes(parent, node, end) {
      let tmp;
      while(node !== end) {
        tmp = node.nextSibling;
        parent.removeChild(node);
        node = tmp;
      }
    }

    function insertNodes(parent, node, end, target) {
      let tmp;
      while (node !== end) {
        tmp = node.nextSibling;
        parent.insertBefore(node, target);
        node = tmp;
      }
    }

    function cleanNode(disposables, node) {
      const key = node[GROUPING];
      const d = disposables.get(key);
      d();
      disposables.delete(key);
    }

    // This is almost straightforward implementation of reconcillation algorithm
    // based on ivi documentation:
    // https://github.com/localvoid/ivi/blob/2c81ead934b9128e092cc2a5ef2d3cabc73cb5dd/packages/ivi/src/vdom/implementation.ts#L1366
    // With some fast paths from Surplus implementation:
    // https://github.com/adamhaile/surplus/blob/master/src/runtime/content.ts#L86
    // And working with data directly from Stage0:
    // https://github.com/Freak613/stage0/blob/master/reconcile.js
    // This implementation is tailored for fine grained change detection and adds suupport for fragments
    function reconcile$1(parent, accessor, mapFn, afterRenderFn, options, beforeNode, afterNode) {
      const { wrap, cleanup, root, sample } = options;
      let disposables = new Map(), counter = 0;

      function createFn(item, i, afterNode) {
        return root(disposer => {
          disposables.set(++counter, disposer);
          const node = prepNodes(mapFn(item, i), counter);
          afterNode ? parent.insertBefore(node, afterNode) : parent.appendChild(node);
          return node;
        });
      }

      function afterRender() {
        afterRenderFn && afterRenderFn(
          beforeNode ? beforeNode.nextSibling : parent.firstChild, afterNode
        );
      }

      cleanup(function dispose() {
        for (let i of disposables.keys()) disposables.get(i)();
        disposables.clear();
      });
      wrap((renderedValues = []) => {
        const data = accessor();
        return sample(() => {
          parent = (beforeNode && beforeNode.parentNode) || parent;
          const length = data.length;

          // Fast path for clear
          if (length === 0) {
            if (beforeNode !== undefined || afterNode !== undefined) {
              let node = beforeNode !== undefined ? beforeNode.nextSibling : parent.firstChild;
              removeNodes(parent, node, afterNode === undefined ? null : afterNode);
            } else parent.textContent = "";

            for (let i of disposables.keys()) disposables.get(i)();
            disposables.clear();
            afterRender();
            return [];
          }

          // Fast path for create
          if (renderedValues.length === 0) {
            let nextData = new Array(length);
            for (let i = 0; i < length; i++) createFn(nextData[i] = data[i], i, afterNode);
            afterRender();
            return nextData;
          }

          let prevStart = 0,
            newStart = 0,
            loop = true,
            prevEnd = renderedValues.length-1, newEnd = length-1,
            a, b,
            prevStartNode = beforeNode ? beforeNode.nextSibling : parent.firstChild,
            newStartNode = prevStartNode,
            prevEndNode = afterNode ? afterNode.previousSibling : parent.lastChild,
            newAfterNode = afterNode;

          fixes: while(loop) {
            loop = false;
            let _node;

            // Skip prefix
            a = renderedValues[prevStart], b = data[newStart];
            while(a === b) {
              prevStart++;
              newStart++;
              newStartNode = prevStartNode = step(prevStartNode, FORWARD);
              if (prevEnd < prevStart || newEnd < newStart) break fixes;
              a = renderedValues[prevStart];
              b = data[newStart];
            }

            // Skip suffix
            a = renderedValues[prevEnd], b = data[newEnd];
            while(a === b) {
              prevEnd--;
              newEnd--;
              newAfterNode = prevEndNode;
              prevEndNode = step(prevEndNode, BACKWARD);
              if (prevEnd < prevStart || newEnd < newStart) break fixes;
              a = renderedValues[prevEnd];
              b = data[newEnd];
            }

            // Fast path to swap backward
            a = renderedValues[prevEnd], b = data[newStart];
            while(a === b) {
              loop = true;
              _node = step(prevEndNode, BACKWARD);
              let mark = _node.nextSibling;
              if (newStartNode !== mark) {
                insertNodes(parent, mark, prevEndNode.nextSibling, newStartNode);
                prevEndNode = _node;
              }
              newStart++;
              prevEnd--;
              if (prevEnd < prevStart || newEnd < newStart) break fixes;
              a = renderedValues[prevEnd];
              b = data[newStart];
            }

            // Fast path to swap forward
            a = renderedValues[prevStart], b = data[newEnd];
            while(a === b) {
              loop = true;
              _node = step(prevStartNode, FORWARD);
              if (prevStartNode !== newAfterNode) {
                let mark = _node.previousSibling;
                insertNodes(parent, prevStartNode, _node, newAfterNode);
                newAfterNode = mark;
                prevStartNode = _node;
              }
              prevStart++;
              newEnd--;
              if (prevEnd < prevStart || newEnd < newStart) break fixes;
              a = renderedValues[prevStart];
              b = data[newEnd];
            }
          }

          // Fast path for shrink
          if (newEnd < newStart) {
            if (prevStart <= prevEnd) {
              let next, key, node;
              while(prevStart <= prevEnd) {
                // manually step to keep refs
                node = prevEndNode;
                key = node[GROUPING];
                while(node.previousSibling && node.previousSibling[GROUPING] === key) node = node.previousSibling;
                next = node.previousSibling;
                removeNodes(parent, node, prevEndNode.nextSibling);
                cleanNode(disposables, prevEndNode);
                prevEndNode = next;
                prevEnd--;
              }
            }
            afterRender();
            return data.slice(0);
          }

          // Fast path for add
          if (prevEnd < prevStart) {
            if (newStart <= newEnd) {
              while(newStart <= newEnd) {
                createFn(data[newStart], newStart, newAfterNode);
                newStart++;
              }
            }
            afterRender();
            return data.slice(0);
          }

          // Positions for reusing nodes from current DOM state
          const P = new Array(newEnd + 1 - newStart);
          for(let i = newStart; i <= newEnd; i++) P[i] = -1;

          // Index to resolve position from current to new
          const I = new Map();
          for(let i = newStart; i <= newEnd; i++) I.set(data[i], i);

          let reusingNodes = 0, toRemove = [];
          for(let i = prevStart; i <= prevEnd; i++) {
            if (I.has(renderedValues[i])) {
              P[I.get(renderedValues[i])] = i;
              reusingNodes++;
            } else {
              toRemove.push(i);
            }
          }

          // Fast path for full replace
          if (reusingNodes === 0) {
            const doRemove = prevStartNode !== parent.firstChild || prevEndNode !== parent.lastChild;
            let node = prevStartNode, mark;
            newAfterNode = prevEndNode.nextSibling;
            while(node !== newAfterNode) {
              mark = step(node, FORWARD);
              cleanNode(disposables, node);
              doRemove && removeNodes(parent, node, mark);
              node = mark;
              prevStart++;
            }
            !doRemove && (parent.textContent = "");

            for(let i = newStart; i <= newEnd; i++) createFn(data[i], i, newAfterNode);
            afterRender();
            return data.slice(0);
          }

          // What else?
          const longestSeq = longestPositiveIncreasingSubsequence(P, newStart),
            nodes = [];
          let tmpC = prevStartNode, lisIdx = longestSeq.length - 1, tmpD;

          // Collect nodes to work with them
          for(let i = prevStart; i <= prevEnd; i++) {
            nodes[i] = tmpC;
            tmpC = step(tmpC, FORWARD);
          }

          for(let i = 0; i < toRemove.length; i++) {
            let index = toRemove[i],
              node = nodes[index];
            removeNodes(parent, node, step(node, FORWARD));
            cleanNode(disposables, node);
          }

          for(let i = newEnd; i >= newStart; i--) {
            if(longestSeq[lisIdx] === i) {
              newAfterNode = nodes[P[longestSeq[lisIdx]]];
              lisIdx--;
            } else {
              if (P[i] === -1) {
                tmpD = createFn(data[i], i, newAfterNode);
              } else {
                tmpD = nodes[P[i]];
                insertNodes(parent, tmpD, step(tmpD, FORWARD), newAfterNode);
              }
              newAfterNode = tmpD;
            }
          }

          afterRender();
          return data.slice(0);
        });
      });
    }

    // Picked from
    // https://github.com/adamhaile/surplus/blob/master/src/runtime/content.ts#L368

    // return an array of the indices of ns that comprise the longest increasing subsequence within ns
    function longestPositiveIncreasingSubsequence(ns, newStart) {
      var seq = [],
        is  = [],
        l   = -1,
        pre = new Array(ns.length);

      for (var i = newStart, len = ns.length; i < len; i++) {
        var n = ns[i];
        if (n < 0) continue;
        var j = findGreatestIndexLEQ(seq, n);
        if (j !== -1) pre[i] = is[j];
        if (j === l) {
          l++;
          seq[l] = n;
          is[l]  = i;
        } else if (n < seq[j + 1]) {
          seq[j + 1] = n;
          is[j + 1] = i;
        }
      }

      for (i = is[l]; l >= 0; i = pre[i], l--) {
        seq[l] = i;
      }

      return seq;
    }

    function findGreatestIndexLEQ(seq, n) {
      // invariant: lo is guaranteed to be index of a value <= n, hi to be >
      // therefore, they actually start out of range: (-1, last + 1)
      var lo = -1,
        hi = seq.length;

      // fast path for simple increasing sequences
      if (hi > 0 && seq[hi - 1] <= n) return hi - 1;

      while (hi - lo > 1) {
        var mid = Math.floor((lo + hi) / 2);
        if (seq[mid] > n) {
          hi = mid;
        } else {
          lo = mid;
        }
      }

      return lo;
    }

    const Types = {
      ATTRIBUTE: 'attribute',
      PROPERTY: 'property'
    };
    var Attributes = {
      href: {
        type: Types.ATTRIBUTE
      },
      style: {
        type: Types.PROPERTY,
        alias: 'style.cssText'
      },
      for: {
        type: Types.PROPERTY,
        alias: 'htmlFor'
      },
      class: {
        type: Types.PROPERTY,
        alias: 'className'
      },
      // React compat
      spellCheck: {
        type: Types.PROPERTY,
        alias: 'spellcheck'
      },
      allowFullScreen: {
        type: Types.PROPERTY,
        alias: 'allowFullscreen'
      },
      autoCapitalize: {
        type: Types.PROPERTY,
        alias: 'autocapitalize'
      },
      autoFocus: {
        type: Types.PROPERTY,
        alias: 'autofocus'
      },
      autoPlay: {
        type: Types.PROPERTY,
        alias: 'autoplay'
      }
    };

    function normalizeIncomingArray(normalized, array) {
      for (var i = 0, len = array.length; i < len; i++) {
        var item = array[i];
        if (item instanceof Node) {
          if (item.nodeType === 11) {
            normalizeIncomingArray(normalized, item.childNodes);
          } else normalized.push(item);
        } else if (item == null || item === true || item === false) ; else if (Array.isArray(item)) {
          normalizeIncomingArray(normalized, item);
        } else if (typeof item === 'string') {
          normalized.push(item);
        } else {
          normalized.push(item.toString());
        }
      }
      return normalized;
    }

    function clearAll(parent, current, marker, startNode) {
      if (!marker) return parent.textContent = '';
      if (Array.isArray(current)) {
        for (let i = 0; i < current.length; i++) {
          parent.removeChild(current[i]);
        }
      } else if (current != null && current != '') {
        if (startNode !== undefined) {
          let node = marker.previousSibling, tmp;
          while(node !== startNode) {
            tmp = node.previousSibling;
            parent.removeChild(node);
            node = tmp;
          }
        }
        else parent.removeChild(marker.previousSibling);
      }
      return '';
    }

    function model(el) {
      let m = el.model, a = el.action, r;
      if (!m && el.parentNode) r = model(el.parentNode);
      return [m || r && r[0], a || r && r[1]];
    }

    function createRuntime(options) {
      const { wrap, cleanup, root } = options;

      function insertExpression(parent, value, current, marker) {
        if (value === current) return current;
        parent = (marker && marker.parentNode) || parent;
        const t = typeof value;
        if (t === 'string' || t === 'number') {
          if (t === 'number') value = value.toString();
          if (marker) {
            if (current !== '' && typeof current === 'string') {
              current = marker.previousSibling.data = value;
            } else {
              const node = document.createTextNode(value);
              if (current !== '' && current != null) {
                parent.replaceChild(node, marker.previousSibling);
              } else parent.insertBefore(node, marker);
              current = value;
            }
          } else {
            if (current !== '' && typeof current === 'string') {
              current = parent.firstChild.data = value;
            } else current = parent.textContent = value;
          }
        } else if (value == null || value === '' || t === 'boolean') {
          current = clearAll(parent, current, marker);
        } else if (t === 'function') {
          wrap(function() { current = insertExpression(parent, value(), current, marker); });
        } else if (value instanceof Node) {
          if (Array.isArray(current)) {
            if (current.length === 0) {
              parent.insertBefore(value, marker);
            } else if (current.length === 1) {
              parent.replaceChild(value, current[0]);
            } else {
              clearAll(parent, current, marker);
              parent.appendChild(value);
            }
          } else if (current == null || current === '') {
            parent.insertBefore(value, marker);
          } else {
            parent.replaceChild(value, (marker && marker.previousSibling) || parent.firstChild);
          }
          current = value;
        } else if (Array.isArray(value)) {
          let array = normalizeIncomingArray([], value);
          clearAll(parent, current, marker);
          if (array.length !== 0) {
            for (let i = 0, len = array.length; i < len; i++) {
              let node = array[i];
              if (!(node instanceof Node))
                node = array[i] = document.createTextNode(node);
              parent.insertBefore(node, marker);
            }
          }
          current = array;
        } else {
          throw new Error("content must be Node, stringable, or array of same");
        }

        return current;
      }

      return Object.assign({
        insert(parent, accessor, init, marker) {
          if (typeof accessor !== 'function') return insertExpression(parent, accessor, init, marker);
          wrap((current = init) => insertExpression(parent, accessor(), current, marker));
        },
        addEventListener(node, eventName, handler) {
          node.addEventListener(eventName, e => {
            if (handler.length < 2) return handler(e);
            const a = model(e.target);
            handler(e, a[0], a[1]);
          });
        },
        spread(node, accessor) {
          wrap(function() {
            const props = accessor();
            let info;
            for (const prop in props) {
              const value = props[prop];
              if (prop === 'style') {
                Object.assign(node.style, value);
              } else if (prop === 'classList') {
                for (const className in value) node.classList.toggle(className, value[className]);
              } else if (info = Attributes[prop]) {
                if (info.type === 'attribute') {
                  node.setAttribute(prop, value);
                } else node[info.alias] = value;
              } else node[prop] = value;
            }
          });
        },
        flow(parent, type, accessor, expr, afterRender, marker) {
          let startNode;
          if (marker) startNode = marker.previousSibling;
          if (type === 'each') {
            reconcile$1(parent, accessor, expr, afterRender, options, startNode, marker);
          } else if (type === 'when') {
            let current, disposable;
            cleanup(function dispose() { disposable && disposable(); });
            wrap(cached => {
              const value = accessor();
              if (value === cached) return cached;
              disposable && disposable();
              parent = (marker && marker.parentNode) || parent;
              if (value == null || value === false) {
                clearAll(parent, current, marker, startNode);
                current = null;
                return value;
              }
              root(disposer => {
                disposable = disposer;
                current = insertExpression(parent, expr(value), current, marker);
                afterRender && afterRender(current, marker);
              });
              return value;
            });
          }
        }
      }, options);
    }

    const r = createRuntime({wrap: S.makeComputationNode, root: S.root, cleanup: S.cleanup, sample: S.sample});

    const _tmpl$11 = document.createElement("template");

    _tmpl$11.innerHTML = "<pre></pre>";

    const _tmpl$10 = document.createElement("template");

    _tmpl$10.innerHTML = "<div class='Main'></div>";

    const _tmpl$9 = document.createElement("template");

    _tmpl$9.innerHTML = "<div class='Tree'></div>";

    const _tmpl$8 = document.createElement("template");

    _tmpl$8.innerHTML = "<span></span>";

    const _tmpl$7 = document.createElement("template");

    _tmpl$7.innerHTML = "<ul class='TreeNode'></ul>";

    const _tmpl$6 = document.createElement("template");

    _tmpl$6.innerHTML = "<li class='TreeLeaf'></li>";

    const _tmpl$5 = document.createElement("template");

    _tmpl$5.innerHTML = "<div class='Anim'></div>";

    const _tmpl$4 = document.createElement("template");

    _tmpl$4.innerHTML = "<div class='AnimBox'></div>";

    const _tmpl$3 = document.createElement("template");

    _tmpl$3.innerHTML = "<table class='Table'><tbody></tbody></table>";

    const _tmpl$2 = document.createElement("template");

    _tmpl$2.innerHTML = "<tr></tr>";

    const _tmpl$ = document.createElement("template");

    _tmpl$.innerHTML = "<td class='TableCell'></td>";

    const TableCell = ({
      text
    }) => {
      function onClick(e) {
        console.log('Clicked' + text);
        e.stopPropagation();
      }

      return function () {
        const _el$ = _tmpl$.content.firstChild.cloneNode(true);

        r.addEventListener(_el$, "click", onClick);
        r.insert(_el$, text);
        return _el$;
      }();
    };

    const TableRow = ({
      data
    }) => function () {
      const _el$2 = _tmpl$2.content.firstChild.cloneNode(true),
            _el$3 = _el$2.insertBefore(document.createTextNode(""), _el$2.firstChild),
            _el$4 = _el$2.insertBefore(document.createTextNode(""), _el$3.nextSibling);

      r.wrap(() => _el$2.className = data.active ? 'TableRow active' : 'TableRow');

      _el$2.setAttribute("data-id", data.id);

      r.insert(_el$2, TableCell({
        text: '#' + data.id
      }), null, _el$3);
      r.flow(_el$2, "each", () => data.props, c => TableCell({
        text: c
      }), null, _el$4);
      return _el$2;
    }();

    const Table = ({
      data
    }) => function () {
      const _el$5 = _tmpl$3.content.firstChild.cloneNode(true),
            _el$6 = _el$5.firstChild;

      r.flow(_el$6, "each", () => data.items, i => TableRow({
        data: i
      }), null);
      return _el$5;
    }();

    const AnimBox = ({
      data
    }) => function () {
      const _el$7 = _tmpl$4.content.firstChild.cloneNode(true);

      _el$7.setAttribute("data-id", data.id);

      r.wrap(() => Object.assign(_el$7.style, {
        borderRadius: (data.time % 10).toString() + 'px',
        background: 'rgba(0,0,0,' + (0.5 + data.time % 10 / 10).toString() + ')'
      }));
      return _el$7;
    }();

    const Anim = ({
      data
    }) => function () {
      const _el$8 = _tmpl$5.content.firstChild.cloneNode(true);

      r.flow(_el$8, "each", () => data.items, i => AnimBox({
        data: i
      }), null);
      return _el$8;
    }();

    const TreeLeaf = ({
      data
    }) => function () {
      const _el$9 = _tmpl$6.content.firstChild.cloneNode(true);

      r.insert(_el$9, data.id);
      return _el$9;
    }();

    const TreeNode = ({
      data
    }) => function () {
      const _el$10 = _tmpl$7.content.firstChild.cloneNode(true);

      r.flow(_el$10, "each", () => data.children, c => function () {
        const _el$11 = _tmpl$8.content.firstChild.cloneNode(true),
              _el$12 = _el$11.insertBefore(document.createTextNode(""), _el$11.firstChild),
              _el$13 = _el$11.insertBefore(document.createTextNode(""), _el$12.nextSibling);

        r.flow(_el$11, "when", () => c.container, () => TreeNode({
          data: c
        }), null, _el$12);
        r.flow(_el$11, "when", () => !c.container, () => TreeLeaf({
          data: c
        }), null, _el$13);
        return _el$11;
      }(), null);
      return _el$10;
    }();

    const Tree = ({
      data
    }) => function () {
      const _el$14 = _tmpl$9.content.firstChild.cloneNode(true);

      r.insert(_el$14, TreeNode({
        data: data.root
      }));
      return _el$14;
    }();

    const Main = ({
      data
    }) => function () {
      const _el$15 = _tmpl$10.content.firstChild.cloneNode(true),
            _el$16 = _el$15.insertBefore(document.createTextNode(""), _el$15.firstChild),
            _el$17 = _el$15.insertBefore(document.createTextNode(""), _el$16.nextSibling),
            _el$18 = _el$15.insertBefore(document.createTextNode(""), _el$17.nextSibling);

      r.flow(_el$15, "when", () => data.location === 'table', () => Table({
        data: data.table
      }), null, _el$16);
      r.flow(_el$15, "when", () => data.location === 'anim', () => Anim({
        data: data.anim
      }), null, _el$17);
      r.flow(_el$15, "when", () => data.location === 'tree', () => Tree({
        data: data.tree
      }), null, _el$18);
      return _el$15;
    }();

    uibench.init('Solid', '0.3.5');
    const [state, setState] = useState({});
    root(() => document.querySelector('#App').appendChild(Main({
      data: state
    })));
    document.addEventListener('DOMContentLoaded', function (e) {
      uibench.run(s => setState(reconcile(s)), samples => {
        document.body.textContent = '';
        document.body.appendChild(function () {
          const _el$19 = _tmpl$11.content.firstChild.cloneNode(true);

          r.insert(_el$19, JSON.stringify(samples, null, ' '));
          return _el$19;
        }());
      });
    });

}());
