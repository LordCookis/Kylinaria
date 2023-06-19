import { supabase } from '../supabaseClient'

export const baseServices = {
    async add(object, image){
        const date = new Date() 
        const filename = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}-${image.name}`
        const { data1 } = await supabase
            .from("Objects")
            .insert({name: object.name, description: object.description, image: filename, price: object.price})
        const { data2 } = await supabase.storage
            .from("Images")
            .upload(filename, image, {
            cacheControl: "3600",
            upsert: false
        })
        const result = await this.objects()
        return result
    },
    async del(id){
        const { data } = await supabase.from("Objects").delete().eq("id", id)
    },
    async upd(id, object, image){
        if (image.length != 0) {
            const date = new Date() 
            console.log("object: ", object)
            console.log("id: ", id)
            const filename = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}-${image.name}`
            const { data1 } = await supabase.from("Objects").update({
                name: object.name,
                description: object.description,
                image: filename,
                price: object.price
            }).eq('id', id)
            const { data2 } = await supabase.storage
                .from("Images")
                .upload(filename, image, {
                cacheControl: "3600",
                upsert: false
            })
        } else {
            const { data1 } = await supabase.from("Objects").update({
                name: object.name,
                description: object.description,
                price: object.price
            }).eq('id', id)
        }
    },
    async objects(){
        const { data } = await supabase.from("Objects").select()
        const filtered = data.map((item) => (
            {...item, image:"https://fygkskorgvtqqitnzwuy.supabase.co/storage/v1/object/public/Images/" + item.image}
        ))
        return filtered
    }
}