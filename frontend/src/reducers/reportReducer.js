import {
    CREATE_REPORT_REQUEST,
    CREATE_REPORT_SUCCESS,
    CREATE_REPORT_FAIL,
    GET_REPORT_FAIL,
    GET_REPORT_REQUEST,
    GET_REPORT_SUCCESS,
    CLEAR_ERRORS,
    CREATE_REPORT_RESET,
    DELETE_REPORT_FAIL,
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_RESET,
} from "../constants/reportConstant";

export const reportReducer = (state={reports:[]},action)=>{
    switch (action.type) {
            case CREATE_REPORT_REQUEST:
                case GET_REPORT_REQUEST:
            return {
                loading:true,
            }
            case GET_REPORT_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    reports:action.payload,
                }
            case CREATE_REPORT_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    message:action.payload,
                }
                case CREATE_REPORT_FAIL:
                    case GET_REPORT_FAIL:
                    return {
                        ...state,
                        loading:false,
                        error:action.payload,
                }
                case CREATE_REPORT_RESET:
                    return {
                        ...state,
                    loading:false,
                        message:null,
                    }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
    
        default:
            return state;
    }
}

export const deleteReportReducer = (state={},action)=>{
    switch (action.type) {
                    case DELETE_REPORT_REQUEST:
            return {
                loading:true,
            }
                case DELETE_REPORT_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    message:action.payload,
                }
                        case DELETE_REPORT_FAIL:
                    return {
                        ...state,
                        loading:false,
                        error:action.payload,
                }
                    case DELETE_REPORT_RESET:
                    return {
                        ...state,
                    loading:false,
                        message:null,
                    }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
    
        default:
            return state;
    }
}