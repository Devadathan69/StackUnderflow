import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function QuestionDetail() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/api/questions/${id}`)
            .then(res => res.json())
            .then(data => setQuestion(data));

        fetch(`http://localhost:5000/api/answers/${id}`)
            .then(res => res.json())
            .then(data => setAnswers(data));
    }, [id]);

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question_id: id, body: newAnswer, user_id: 1 })
        });
        if (res.ok) {
            const addedAnswer = await res.json();
            setAnswers([...answers, addedAnswer]);
            setNewAnswer('');
        }
    };

    if (!question) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px', textAlign: 'left' }}>
            <h1>{question.title}</h1>
            <p style={{ fontSize: '1.2rem', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                {question.body}
            </p>

            <h3>{answers.length} Answers</h3>
            {answers.map(ans => (
                <div key={ans.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                    <p>{ans.body}</p>
                    <small>{new Date(ans.created_at).toLocaleDateString()}</small>
                </div>
            ))}

            <form onSubmit={handleAnswerSubmit} style={{ marginTop: '30px' }}>
                <h3>Your Answer</h3>
                <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    rows={5}
                    style={{ width: '100%', padding: '10px' }}
                    required
                />
                <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', background: '#28a745', color: '#fff' }}>
                    Post Your Answer
                </button>
            </form>
        </div>
    );
}

export default QuestionDetail;
