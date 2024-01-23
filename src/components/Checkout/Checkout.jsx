import { useState, useEffect, useContext } from "react"
import { CartContext } from "../../context/ContextCart"
import { db } from "../../services/config"
import { collection, addDoc, updateDoc, getDoc, doc } from "firebase/firestore"
import './Checkout.css'

const Checkout = () => {
    const { cart, eraseCart, total, totalQty } = useContext(CartContext);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [confirmationMail, setConfirmationMail] = useState("");
    const [orderId, setOrderId] = useState("");
    const [error, setError] = useState("");

    const submithandler = (event) => {
        event.preventDefault();

        if (!name || !lastName || !phone || !email || !confirmationMail) {
            setError("Please complete all fields");
            return;
        }

        if (email !== confirmationMail) {
            setError("Email are not the same");
            return;
        }

        const order = {
            items: cart.map(product => ({
                id: product.item.id,
                name: product.item.name,
                qty: product.qty
            })),
            total: total,
            date: new Date(),
            name,
            lastName,
            phone,
            email,
        }

        Promise.all(
            order.items.map(async (productOrder) => {
                const productRef = doc(db, "inventory", productOrder.id);
                const productDoc = await getDoc(productRef);
                const currentStock = productDoc.data().stock;

                await updateDoc(productRef, {
                    stock: currentStock - productOrder.qty
                })
            })
        )
            .then(() => {
                addDoc(collection(db, "orders"), order)
                    .then(docRef => {
                        setOrderId(docRef.id);
                        eraseCart();
                    })
                    .catch(error => console.log("Error creating the order", error));
            })
            .catch(error => {
                console.log("Couldn't update the stock", error);
                setError("Couldn't update the stock");
            })
    }

    return (
        <div className="CheckoutInfo">
            <h3 className="Checkout"> Checkout </h3>

            <form className="FormComplete" onSubmit={submithandler}>

                {
                    cart.map(product => (
                        <div key={product.item.id}>
                            <p> {product.item.name} x {product.qty} </p>
                            <p>Price: $ {product.item.price} </p>
                            <hr />
                        </div>
                    ))
                }

                <hr />
                
                {
                    <div className="TotalCost">
                        <p>Total Cost: $ {total}</p>
                        <hr />
                    </div>
                }

                <div className="PersonalInfo">
                    <div className="InputField">
                        <label htmlFor=""> Name </label>
                        <input  className="SpecificField" type="text" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="InputField">
                        <label htmlFor=""> Last name </ label>
                        <input  className="SpecificField" type="text" onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="InputField">
                        <label htmlFor=""> Phone </label>
                        <input className="SpecificField" type="text" onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="InputField">
                        <label htmlFor=""> Email </label>
                        <input className="SpecificField"  type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="InputField">
                        <label htmlFor=""> Email Confirmation </label>
                        <input className="SpecificField" type="email" onChange={(e) => setConfirmationMail(e.target.value)} />
                    </div>

                    {
                        error && <p style={{ color: "red" }}> {error} </p>
                    }

                    <button type="submit"> Finish order </button>

                    {
                        orderId && (
                            <strong> Thanks for your purchase! Your order number is {orderId} </strong>
                        )
                    }

                </div>
            </form>
        </div>
    )
}

export default Checkout