const combineReducer = (reducers: any) => {
    const reducerKeys = Object.keys(reducers)
    let objInitState: {
        [reducerName: string]: (state: any, action: {type: string, payload: any}) => any
    } = {};
    
    reducerKeys.forEach((key) => {
        const initState = reducers[key](undefined, { type: '' })
        
        if (initState === 'undefined') {
            throw new Error(`${key} does not return state.`)
        }
        
        objInitState[key] = initState;
    })
    
    return (state: any, action: {type: string, payload: any}) => {
        if (action) {
            reducerKeys.forEach((key) => {
                const previousState = objInitState[key]

                objInitState[key] = reducers[key](previousState, action)
                
            })
        }
  
        return { ...objInitState }
    }
};

export default combineReducer;