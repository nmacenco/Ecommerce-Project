import { Product } from "../../../redux/interface";

export default function editValidations(props: Product, props2: Product): boolean {
    let bool: boolean = false,
        name: boolean = false,
        brand: boolean = false,
        image: boolean = false,
        price: boolean = false,
        description: boolean = false,
        weight: boolean = false

    if (props.name === "") {
        props.name = props2.name;
        name = true;
    }
    if (props.brand !== "") {
        props.brand = props2.brand;
        brand = true;
    }
    if (props.image !== "") {
        props.image = props2.image;
        image = true;
    }
    if (props.description !== "") {
        props.description = props2.description;
        description = true;
    }
    if (props.weigth > 0) {
        props.weigth = props2.weigth;
        weight = true;
    }
    if (props.price > 0) {
        props.price = props2.price;
        price = true;
    }

    if (name && brand && description && image && price && weight) bool = true;

    return bool
}