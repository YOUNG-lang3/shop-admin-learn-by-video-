import { useCookies } from '@vueuse/integrations/useCookies'

const cookie = useCookies();
const tokenKey = "admin-token";

export function getToken() {
    return cookie.get(tokenKey);
}

export function setToken(token) {
    return cookie.set(tokenKey, token);
}

export function removeToken() {
    return cookie.remove(tokenKey);
}