import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../App.css'; 

function ViewFeedback() {
    const [feedbacks, setFeedback] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [actionEmail, setActionEmail] = useState('');
    const [editComment, setEditComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = () => {
        axios.get("http://localhost:8000/feedback/")
            .then((res) => setFeedback(res.data))
            .catch((err) => alert(err.message));
    };

    const handleActionClick = (feedback, actionType) => {
        setEditingId(actionType === 'edit' ? feedback._id : null);
        setDeletingId(actionType === 'delete' ? feedback._id : null);
        setEditComment(actionType === 'edit' ? feedback.comment : '');
        setActionEmail('');
        setError('');
    };

    const verifyEmail = (feedbackId) => {
        const feedbackItem = feedbacks.find(fb => fb._id === feedbackId);
        if (!feedbackItem) {
            setError("Feedback not found.");
            return false;
        }
        if (actionEmail !== feedbackItem.email) {
            setError("Please enter the correct email address associated with the feedback.");
            return false;
        }
        return true;
    };

    const handleSave = async (feedbackId) => {
        if (!verifyEmail(feedbackId)) return;

        try {
            const response = await axios.put(
                `http://localhost:8000/feedback/update/${feedbackId}`,
                { email: actionEmail, comment: editComment }
            );

            if (response.status === 200) {
                setFeedback(feedbacks.map(fb => 
                    fb._id === feedbackId ? { ...fb, comment: editComment } : fb
                ));
                cancelActions();
            }
        } catch (err) {
            setError("Error updating feedback. Please try again.");
        }
    };

    const handleDelete = async (feedbackId) => {
        if (!verifyEmail(feedbackId)) return;

        try {
            const response = await axios.delete(
                `http://localhost:8000/feedback/delete/${feedbackId}`
            );

            if (response.status === 200) {
                fetchFeedbacks();
                cancelActions();
            }
        } catch (err) {
            setError("Error deleting feedback. Please try again.");
        }
    };

    const cancelActions = () => {
        setEditingId(null);
        setDeletingId(null);
        setActionEmail('');
        setError('');
    };

    const maskEmail = (email) => {
        const [name, domain] = email.split("@");
        return `${name.slice(0, 3)}***@${domain}`;
    };

    return (
        <div className="feedback-container">
            <h1 className="feedback-title">Customer Feedbacks of Our Service</h1>
            {error && <div className="error-message">{error}</div>}
            
            <div className="feedback-list">
                {feedbacks.map((feedback) => (
                    <div className="feedback-card" key={feedback._id}>
                        <div className="feedback-header">
                            <div>
                                <span className="customer-name">
                                    {feedback.customerName || 'Anonymous'}
                                </span>
                                {feedback.email && (
                                    <div className="email">
                                        {maskEmail(feedback.email)}
                                    </div>
                                )}
                            </div>
                            <span className="feedback-date">
                                {new Date(feedback.date).toLocaleDateString()}
                            </span>
                        </div>

                        {(editingId === feedback._id || deletingId === feedback._id) ? (
                            <div className="action-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email to confirm"
                                    className="email-input"
                                    value={actionEmail}
                                    onChange={(e) => setActionEmail(e.target.value)}
                                />
                                
                                {editingId === feedback._id && (
                                    <textarea
                                        className="comment-edit"
                                        value={editComment}
                                        onChange={(e) => setEditComment(e.target.value)}
                                    />
                                )}

                                <div className="action-buttons">
                                    {editingId === feedback._id ? (
                                        <button 
                                            className="save-button"
                                            onClick={() => handleSave(feedback._id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(feedback._id)}
                                        >
                                            Confirm Delete
                                        </button>
                                    )}
                                    <button 
                                        className="cancel-button"
                                        onClick={cancelActions}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="feedback-comment">
                                    {feedback.comment}
                                </div>
                                <div className="action-controls">
                                    <button 
                                        className="update-button"
                                        onClick={() => handleActionClick(feedback, 'edit')}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleActionClick(feedback, 'delete')}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                
                {feedbacks.length === 0 && (
                    <div className="no-feedback">No feedbacks available</div>
                )}
            </div>
        </div>
    );
}

export default ViewFeedback;