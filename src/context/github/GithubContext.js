import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_TOKEN
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
   const initialState = {
    users: [],
    loading: false,
   }

   const [state, dispatch] = useReducer(githubReducer, initialState)

   // Not calling Fetch Users
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
         q: text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
         Authorization: `token ${GITHUB_TOKEN}`
        }
        })

        const {items} = await response.json()

        dispatch(
        {
            type: 'Get_USERS',
            // data from api 
            payload: items,
        })
    }

    // Set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
        // Pass in state when switched to reducer function
        users: state.users,
        loading: state.loading,
        searchUsers,
    }}> 
        {children}
    </GithubContext.Provider>
}

export default GithubContext