import React,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
/**
 * Sample cards shown in the hero's fanned stack. Swap these for
 * a lightweight /api/notes?limit=3 call later if you want it live.
 */
const Hero = () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
    axios.get("/api/notes")
        .then(res => setNotes(res.data))
        .catch((err) => {
            console.error(err);
        });
    }, []);
    const totalNotes=notes.length;
    const previewNotes=notes.slice(0,3);
    const stats = [
    { label: "Notes shared", value: totalNotes }, /*baidhyaaaaaaaaaaaaaa  here add a variable to count no of uploaded notes */
    { label: "Faculties", value: "6" },
    { label: "Semesters", value: "1–8" },
    ];
    return (
        <section className="relative overflow-hidden bg-[#EEF1F6] min-h-screen flex items-center">
            {/* Ruled notebook-paper backdrop */}
            <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent 0px, transparent 35px, #C7D0DD 36px)",
                }}
            />
            {/* Left margin rule, like a notebook page */}
            <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-16 md:left-24 w-px bg-red-300/60 hidden sm:block"
            />

            <div className="relative max-w-7xl mx-auto px-6 md:pl-28 py-24 grid md:grid-cols-2 gap-16 items-center">

                {/* Left side — thesis */}
                <div>
                    <span className="inline-flex items-center gap-2 bg-white text-[#3457D5] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm border border-[#C7D0DD]">
                        📚 NoteJS — built by students, for students
                    </span>

                    <h1
                        className="mt-7 text-5xl md:text-6xl font-bold text-[#1B2430] leading-[1.08]"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                    >
                        Share notes.
                        <br />
                        <span className="relative inline-block">
                            <span className="relative z-10">Learn</span>
                            <span
                                aria-hidden="true"
                                className="absolute left-0 right-0 bottom-1 h-4 -z-0"
                                style={{ backgroundColor: "#FFD84D", transform: "rotate(-1deg)" }}
                            />
                        </span>{" "}
                        together.
                    </h1>

                    <p className="mt-6 text-lg text-[#3E4757] leading-8 max-w-md">
                        Upload your lecture notes, browse what your batchmates
                        have shared, and find exactly what you need — sorted
                        by faculty and semester, not buried in a group chat.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <Link
                            to="/notes"
                            className="bg-[#3457D5] hover:bg-[#2945b3] text-white px-8 py-3 rounded-lg shadow-lg shadow-blue-900/10 transition font-medium"
                        >
                            Browse notes
                        </Link>

                        <Link
                            to="/upload"
                            className="border-2 border-[#1B2430] text-[#1B2430] hover:bg-[#1B2430] hover:text-white px-8 py-3 rounded-lg transition font-medium"
                        >
                            Upload notes
                        </Link>
                    </div>

                    {/* Stat tabs — index-card style, not big vanity numbers */}
                    <dl className="mt-12 flex gap-8">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={i > 0 ? "pl-8 border-l border-[#C7D0DD]" : ""}
                            >
                                <dt className="text-xs uppercase tracking-wide text-[#7A8699] font-semibold">
                                    {stat.label}
                                </dt>
                                <dd
                                    className="text-2xl font-bold text-[#1B2430] mt-1"
                                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                                >
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Right side — the signature: a fanned stack of real note cards */}
                <div className="relative h-[420px] hidden md:block" aria-hidden="true">
                    {previewNotes.map((note, i) => {
                        const rotations = [-7, 3, -2];
                        const offsets = [40, 10, -20];
                        const isFront = i === previewNotes.length - 1;

                        return (
                            <div
                                key={note.title}
                                className="note-card absolute w-72 bg-white rounded-lg border border-[#E3E7EF] p-5"
                                style={{
                                    top: `${offsets[i] + 60}px`,
                                    left: `${i * 26}px`,
                                    transform: `rotate(${rotations[i]}deg)`,
                                    boxShadow: isFront
                                        ? "0 20px 40px -12px rgba(27,36,48,0.25)"
                                        : "0 8px 20px -8px rgba(27,36,48,0.15)",
                                    zIndex: i,
                                    animationDelay: `${i * 120}ms`,
                                    clipPath: isFront
                                        ? "polygon(0% 2%, 4% 0%, 9% 3%, 15% 0%, 22% 2%, 29% 0%, 36% 3%, 44% 0%, 51% 2%, 58% 0%, 66% 3%, 74% 0%, 82% 2%, 90% 0%, 96% 3%, 100% 0%, 100% 100%, 0% 100%)"
                                        : undefined,
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#3457D5] bg-[#EEF1F6] px-2 py-1 rounded">
                                        {note.faculty} · Sem {note.semester}
                                    </span>
                                    <span className="text-[10px] text-[#9AA5B5] font-semibold">
                                        {note.pages}p PDF
                                    </span>
                                </div>

                                <h3
                                    className="text-lg font-semibold text-[#1B2430] leading-snug"
                                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                                >
                                    {note.title}
                                </h3>

                                <p className="text-sm text-[#7A8699] mt-2">
                                    {note.subject}
                                </p>

                                <div
                                    aria-hidden="true"
                                    className="mt-4 h-1.5 w-10 rounded-full"
                                    style={{ backgroundColor: "#FFD84D" }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes cardFanIn {
                    from {
                        opacity: 0;
                        transform: translateY(24px) rotate(0deg) scale(0.96);
                    }
                    to {
                        opacity: 1;
                    }
                }
                .note-card {
                    animation: cardFanIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
                }
                @media (prefers-reduced-motion: reduce) {
                    .note-card {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;