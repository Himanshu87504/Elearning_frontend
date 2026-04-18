import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);
    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lec-page">

          {/* ── Progress Bar ── */}
          <div className="lec-progress-bar">
            <div className="lec-progress-info">
              <span className="lec-progress-label">Course Progress</span>
              <span className="lec-progress-count">
                {completedLec} / {lectLength} lectures
              </span>
            </div>
            <div className="lec-progress-track">
              <div className="lec-progress-fill" style={{ width: `${completed}%` }} />
            </div>
            <span className="lec-progress-pct">{completed}% complete</span>
          </div>

          {/* ── Main Layout ── */}
          <div className="lec-layout">

            {/* ── Left: Video Player ── */}
            <div className="lec-player">
              {lecLoading ? (
                <div className="lec-player-placeholder"><Loading /></div>
              ) : lecture.video ? (
                <>
                  <div className="lec-video-wrap">
                    <video
                      src={lecture.video}
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                      onEnded={() => addProgress(lecture._id)}
                      className="lec-video"
                    />
                  </div>
                  <div className="lec-video-info">
                    <h1 className="lec-video-title">{lecture.title}</h1>
                    <p className="lec-video-desc">{lecture.description}</p>
                  </div>
                </>
              ) : (
                <div className="lec-player-placeholder">
                  <div className="lec-placeholder-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <p>Select a lecture to start watching</p>
                </div>
              )}
            </div>

            {/* ── Right: Sidebar ── */}
            <div className="lec-sidebar">

              {/* Admin: Add Lecture */}
              {user && user.role === "admin" && (
                <>
                  <button
                    className={`lec-add-btn ${show ? "lec-add-btn--close" : ""}`}
                    onClick={() => setShow(!show)}
                  >
                    {show ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Cancel
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Lecture
                      </>
                    )}
                  </button>

                  {show && (
                    <div className="lec-form-card">
                      <h3 className="lec-form-title">New Lecture</h3>
                      <form onSubmit={submitHandler} className="lec-form">
                        <div className="lec-field">
                          <label className="lec-label">Title</label>
                          <input
                            type="text"
                            className="lec-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Lecture title..."
                            required
                          />
                        </div>
                        <div className="lec-field">
                          <label className="lec-label">Description</label>
                          <input
                            type="text"
                            className="lec-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description..."
                            required
                          />
                        </div>
                        <div className="lec-field">
                          <label className="lec-label">Video File</label>
                          <label className="lec-file-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Choose Video
                            <input
                              type="file"
                              onChange={changeVideoHandler}
                              required
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                        {videoPrev && (
                          <video src={videoPrev} controls className="lec-preview-video" />
                        )}
                        <button disabled={btnLoading} type="submit" className="lec-submit-btn">
                          {btnLoading ? <span className="lec-spinner" /> : "Upload Lecture"}
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}

              {/* Lectures List */}
              <div className="lec-list-head">
                <span className="lec-list-label">Course Lectures</span>
                <span className="lec-list-count">{lectures.length}</span>
              </div>

              <div className="lec-list">
                {lectures && lectures.length > 0 ? (
                  lectures.map((e, i) => (
                    <div key={i} className="lec-item-wrap">
                      <div
                        onClick={() => fetchLecture(e._id)}
                        className={`lec-item ${lecture._id === e._id ? "lec-item--active" : ""}`}
                      >
                        <div className="lec-item-num">
                          {progress[0] && progress[0].completedLectures.includes(e._id) ? (
                            <span className="lec-item-tick"><TiTick /></span>
                          ) : (
                            <span>{i + 1}</span>
                          )}
                        </div>
                        <div className="lec-item-info">
                          <span className="lec-item-title">{e.title}</span>
                          {progress[0] && progress[0].completedLectures.includes(e._id) && (
                            <span className="lec-item-done">Completed</span>
                          )}
                        </div>
                        <div className="lec-item-play">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>

                      {user && user.role === "admin" && (
                        <button className="lec-delete-btn" onClick={() => deleteHandler(e._id)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="lec-empty">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <p>No lectures yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;