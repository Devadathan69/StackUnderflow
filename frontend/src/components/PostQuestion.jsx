import { useState } from 'react';

function PostQuestion() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questionData = {
            title,
            body,
            user_id: 1,
        };

        try {
            const response = await fetch('http://localhost:5000/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionData),
            });

            if (response.ok) {
                setMessage('Question posted successfully!');
                setTitle('');
                setBody('');
            } else {
                setMessage('Failed to post question.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error connecting to server.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Ask a Public Question</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="e.g. How do I use PostgreSQL with React?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <textarea
                    placeholder="Describe your problem in detail..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={10}
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', cursor: 'pointer' }}>
                    Post your question
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default PostQuestion;
