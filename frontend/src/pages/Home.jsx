import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostQuestion from '../components/PostQuestion';

function Home() {
    const [questions, setQuestions] = useState([]);

    const fetchQuestions = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/questions');
            const data = await res.json();
            setQuestions(data);
        } catch (err) {
            console.error("Error fetching questions:", err);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <section style={{ marginBottom: '40px' }}>
                <PostQuestion />
            </section>

            <hr />

            <section style={{ textAlign: 'left' }}>
                <h2>Top Questions</h2>
                {questions.length > 0 ? (
                    questions.map((q) => (
                        <div
                            key={q.id}
                            style={{
                                borderBottom: '1px solid #eee',
                                padding: '20px 0',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Link
                                to={`/question/${q.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: '#0074cc',
                                    fontSize: '1.25rem',
                                    fontWeight: '500'
                                }}
                            >
                                {q.title}
                            </Link>

                            <p style={{ color: '#525960', margin: '10px 0' }}>
                                {q.body.length > 200 ? q.body.substring(0, 200) + '...' : q.body}
                            </p>

                            <small style={{ color: '#838c95' }}>
                                Asked on {new Date(q.created_at).toLocaleDateString()}
                            </small>
                        </div>
                    ))
                ) : (
                    <p>No questions yet. Be the first to ask!</p>
                )}
            </section>
        </div>
    );
}

export default Home;
