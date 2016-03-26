'use strict';

//------------------------------------- invariant --------------------------------------
/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = typeof process === 'object' ? process.env.NODE_ENV : null;

function invariant(condition, format, a, b, c, d, e, f) {
    if (NODE_ENV !== 'production') {
        if (format === undefined) {
            throw new Error('invariant requires an error message argument');
        }
    }

    if (!condition) {
        var error;
        if (format === undefined) {
            error = new Error(
                'Minified exception occurred; use the non-minified dev environment ' +
                'for the full error message and additional helpful warnings.'
            );
        } else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(
                format.replace(/%s/g, function() { return args[argIndex++]; })
            );
            error.name = 'Invariant Violation';
        }

        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
    }
};



//------------------------------------- shallowequal --------------------------------------
var fetchKeys = lodash.keys;

function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
        return !!ret;
    }

    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = fetchKeys(objA);
    var keysB = fetchKeys(objB);

    var len = keysA.length;
    if (len !== keysB.length) {
        return false;
    }

    compareContext = compareContext || null;

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < len; i++) {
        var key = keysA[i];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];

        var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (_ret === false || _ret === void 0 && valueA !== valueB) {
            return false;
        }
    }

    return true;
};




//------------------------------------- hoistStatics --------------------------------------
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

function hoistStatics(targetComponent, sourceComponent) {
    var keys = Object.getOwnPropertyNames(sourceComponent);
    for (var i=0; i<keys.length; ++i) {
        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
            try {
                targetComponent[keys[i]] = sourceComponent[keys[i]];
            } catch (error) {

            }
        }
    }

    return targetComponent;
};



//-------------------------------------  komposer --------------------------------------


function DefaultErrorComponent({error}) {
    return (
        <pre style={{color: 'red'}}>
      {error.message} <br />
      {error.stack}
        </pre>
    );
}

function DefaultLoadingComponent() {
    return (<p>Loading...</p>);
}

function compose(fn, L1, E1, options = {pure: true}) {
    return (ChildComponent, L2, E2) => {
        invariant(
            Boolean(ChildComponent),
            'Should provide a child component to build the higher order container.'
        );

        const LoadingComponent = L1 || L2 || DefaultLoadingComponent;
        const ErrorComponent = E1 || E2 || DefaultErrorComponent;

        const Container = class extends React.Component {
            constructor(props, context) {
                super(props, context);

                this.state = {};

                // XXX: In the server side environment, we need to
                // stop the subscription right away. Otherwise, it's a starting
                // point to huge subscription leak.
                this._subscribe(props);
            }

            componentDidMount() {
                this._mounted = true;
            }

            componentWillReceiveProps(props) {
                this._subscribe(props);
            }

            componentWillUnmount() {
                this._mounted = false;
                this._unsubscribe();
            }

            shouldComponentUpdate(nextProps, nextState) {
                if (!options.pure) {
                    return true;
                }

                return (
                !shallowEqual(this.props, nextProps) ||
                this.state.error !== nextState.error ||
                !shallowEqual(this.state.payload, nextState.payload)
                );
            }

            render() {
                const error = this._getError();
                const loading = this._isLoading();

                if (error) {
                    return (<ErrorComponent error={error}/>);
                }

                if (loading) {
                    return (<LoadingComponent />);
                }

                return (<ChildComponent {...this._getProps()} />);
            }

            _subscribe(props) {
                this._unsubscribe();

                this._stop = fn(props, (error, payload) => {
                    if (error) {
                        invariant(
                            error.message && error.stack,
                            'Passed error should be an instance of an Error.'
                        );
                    }

                    const state = {error, payload};

                    if (this._mounted) {
                        this.setState(state);
                    } else {
                        this.state = state;
                    }
                });
            }

            _unsubscribe() {
                if (this._stop) {
                    this._stop();
                }
            }

            _getProps() {
                const {
                    payload = {}
                    } = this.state;

                const props = {
                ...this.props,
                ...payload
                };

                return props;
            }

            _getError() {
                const {error} = this.state;
                return error;
            }

            _isLoading() {
                const {payload} = this.state;
                return !Boolean(payload);
            }
        };

        const childDisplayName =
            // Get the display name if it's set.
            ChildComponent.displayName ||
                // Get the display name from the function name.
            ChildComponent.name ||
                // If not, just add a default one.
            'ChildComponent';

        Container.displayName = `Container(${childDisplayName})`;
        return hoistStatics(Container, ChildComponent);
    };
}

function composeWithTracker(reactiveFn, L, E, options) {
    const onPropsChange = (props, onData) => {
        let trackerCleanup;
        const handler = Tracker.nonreactive(() => {
            return Tracker.autorun(() => {
                trackerCleanup = reactiveFn(props, onData);
            });
        });

        return () => {
            if (typeof (trackerCleanup) === 'function') {
                trackerCleanup();
            }
            return handler.stop();
        };
    };

    return compose(onPropsChange, L, E, options);
}

function composeWithPromise(fn, L, E, options) {
    const onPropsChange = (props, onData) => {
        const promise = fn(props);
        invariant(
            (typeof promise.then === 'function') &&
            (typeof promise.catch === 'function'),
            'Should return a promise from the callback of `composeWithPromise`'
        );

        onData();
        promise
            .then(data => {
                invariant(
                    typeof data === 'object',
                    'Should return a plain object from the promise'
                );
                const clonedData = {...data};
                onData(null, clonedData);
            }).catch(err => { onData(err); });
    };

    return compose(onPropsChange, L, E, options);
}


// utility function to compose multiple composers at once.
function composeAll(...composers) {
    return function (BaseComponent) {
        if (BaseComponent === null || BaseComponent === undefined) {
            throw new Error('Curry function of composeAll needs an input.');
        }

        let finalComponent = BaseComponent;
        composers.forEach(composer => {
            if (typeof composer !== 'function') {
                throw new Error('Composer should be a function.');
            }

            finalComponent = composer(finalComponent);

            if (finalComponent === null || finalComponent === undefined) {
                throw new Error('Composer function should return a value.');
            }
        });


        return finalComponent;
    };
}

Composer = {
    compose,
    composeWithTracker,
    composeWithPromise,
    composeAll
}