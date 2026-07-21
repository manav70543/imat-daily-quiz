import "../styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                <div className="footer-brand">
                    <h2>🎓 IMAT Quiz</h2>

                    <p>
                        Daily practice for your IMAT preparation.
                    </p>
                </div>

                <div className="footer-info">

                    <span>
                        📧 <a href="mailto:imatquiz@gmail.com">
                            imatquiz@gmail.com
                        </a>
                    </span>

                    <span>
                        🇮🇳 Origin: India
                    </span>

                    <span>
                        ⚡ Version: 520-nahl-1314
                    </span>

                </div>

            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} IMAT Quiz. All rights reserved.
                </p>
            </div>

        </footer>
    );
}