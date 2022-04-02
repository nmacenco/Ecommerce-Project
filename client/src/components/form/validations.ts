import { Product } from "../../redux/interface";

export default function validations(props: Product): boolean {
    let bool: boolean = false,
        name: boolean = false,
        brand: boolean = false,
        image: boolean = false,
        price: boolean = false,
        description: boolean = false,
        weight: boolean = false

    if (props.name !== "") name = true;
    if (props.brand !== "") brand = true;
    if (props.image !== "") image = true;
    if (props.description !== "") description = true;
    if (props.weigth > 0) weight = true;
    if (props.price > 0) price = true;

    if (name && brand && image && price && description && weight) {
        bool = true;
    }
    return bool;
}