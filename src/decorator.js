const multidecorator = (...decorators) => {
    return (Wrapped) => {
        return decorators.reverse()
            .reduce((WrappedComponent, decorator) => decorator(WrappedComponent), Wrapped)
    }
}

export default multidecorator