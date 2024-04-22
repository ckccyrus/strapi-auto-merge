const Checker = () => {
    const checkHasValue = <T>($param: T | null) => {
        if (!$param) {
            const error = new Error("Empty value !!!");
            throw error;
        }
    }

    const checkObjectHasProperties = ($object: any) => {
        if (Object.keys($object).length === 0) {
            const error = new Error("Empty object is not allowed !!!");
            throw error;
        }
    }

    return {
        checkHasValue,
        checkObjectHasProperties
    }
}

export default Checker();