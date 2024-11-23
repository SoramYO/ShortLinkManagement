import { jwtDecode } from "jwt-decode";

export const isAuthenticate = () : boolean => {
    return localStorage.getItem('accessToken') ? true : false
}

export const getAccessToken = () : string | null => {
    return localStorage.getItem('accessToken')
}
export const getEmail = () : string | null => {
    return localStorage.getItem('email')
}
export const getName = () : string | null => {
    return localStorage.getItem('name')
}


export const getRole = (): string | undefined => {
    const accessToken = getAccessToken();
    if (accessToken) {
        const decodedToken: any = jwtDecode(accessToken);
        console.log(decodedToken);
        return decodedToken["role"] || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    return undefined;
};