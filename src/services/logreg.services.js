import { supabase } from '../supabaseClient'

export const logRegServices = {
    async add(login, password){
        const { data, error } = await supabase.from('Admins').select().eq("login", login)
        if (data.length) {
            throw new Error("Администратор уже есть")
        }
        await supabase.from('Admins').insert({ login, password })
    },
    async get(login, password){
        if (!login) {
            return false
        }
        const { data, error } = await supabase.from('Admins').select().eq("login", login)
        if (!data.length) {
            throw new Error("Логина нет")
        }
        if (data[0].password !== password) { 
            throw new Error("Пароль не верный")
        }
        if (error) {
            throw new Error("Ошибка")
        }
        return true
    },
    async exit() {
        return false
    }
}