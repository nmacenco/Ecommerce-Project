import { Product, ProductForm } from "../../../redux/interface";

export default function editValidations(props: ProductForm, props2: Product): boolean {
    let bool: boolean = false,
        name: boolean = false,
        BrandId: boolean = false,
        image: boolean = false,
        price: boolean = false,
        description: boolean = false,
        weight: boolean = false

    if (props.name === "") {
        props.name = props2.name;
        name = true;
    }
    if (props.BrandId > 0) {
        props.BrandId = props2.BrandId;
        BrandId = true;
    }
    if (props.image === "") {
        props.image = props2.image;
        image = true;
    }
    if (props.description === "") {
        props.description = props2.description;
        description = true;
    }
    if (props.weight > 0) {
        props.weight = props2.weight;
        weight = true;
    }
    if (props.price > 0) {
        props.price = props2.price;
        price = true;
    }

    if (name && BrandId && description && image && price && weight) bool = true;

    return bool
}