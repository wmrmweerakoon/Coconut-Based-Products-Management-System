import React, { useState } from "react"; 
import axios from "axios";
import '../App.css'; 

function AddFeedback() {
    const [customerName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [isChecked, setIsChecked] = useState(false); // State for checkbox

    function sendData(e) {
        e.preventDefault();

        if (!isChecked) {
            alert("You must agree to publish your review before submitting.");
            return;
        }

        const newFeedback = {
            customerName,
            email,
            comment
        };

        console.log(newFeedback);

        axios.post("http://localhost:8000/feedback/add", newFeedback)
            .then(() => {
                alert("Feedback Added");
                window.location.href = "/feedback";
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="form-container">
            <h1 className="text-center mb-4" style={{ fontFamily: '-moz-initial' }}>
                <b>✍️ Add Feedback</b>
            </h1>
            <form className="bg-light p-4 rounded shadow-sm" style={{ maxWidth: '650px', margin: '0 auto', color: 'black' }} onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="CustomerName" className="form-label"><b>Customer Name</b></label>
                    <input
                        type="text" className="form-control" id="CustomerName" placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)} required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="CustomerEmail" className="form-label"><b>Email</b></label>
                    <input
                        type="email" className="form-control" id="CustomerEmail" placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)} required
                    />
                    <div id="emailHelp" className="form-text">*We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="Comment" className="form-label"><b>Comment</b></label>
                    <textarea
                        className="form-control" id="Comment" placeholder="Write your comment here..." rows="3"
                        onChange={(e) => setComment(e.target.value)} required
                    ></textarea>
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox" className="form-check-input" id="AgreeCheck"
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="AgreeCheck">
                        I agree that my review can be published on the website.
                    </label>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" style={{ width: '180px' }}>Submit Feedback</button>
                </div>
            </form>
        </div>
    );
}

export default AddFeedback;