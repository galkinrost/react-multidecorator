const decorator = (...decorators) => {
    return (Wrapped)=> {
        return decorators.reduce((WrappedComponent, decorator)=> decorator(WrappedComponent) , Wrapped);
    }
};

export default decorator;