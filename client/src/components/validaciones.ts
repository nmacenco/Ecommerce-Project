
interface IProduct_Create {
    subcategory_id?: string[];
    name?: string;
    brand?: string;
    image?: string;
    price?: number;
    description?: string;
    weight?: number;
    stock?: number;
}

export default function validaciones(props: IProduct_Create): boolean {
    let numerito = true;
    return numerito
}