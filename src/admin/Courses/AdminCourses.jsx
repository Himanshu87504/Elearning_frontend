import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { courses, fetchCourses } = CourseData();

  const processFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const changeImageHandler = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const resetForm = () => {
    setImage(""); setTitle(""); setDescription("");
    setDuration(""); setImagePrev(""); setCreatedBy("");
    setPrice(""); setCategory("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success(data.message);
      await fetchCourses();
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses">

        {/* ── LEFT: course list ── */}
        <div className="ac-left">
          <div className="ac-panel-header">
            <h1 className="ac-title">All <em>Courses</em></h1>
            <p className="ac-sub">
              {courses?.length
                ? `${courses.length} course${courses.length !== 1 ? "s" : ""} published`
                : "No courses yet"}
            </p>
          </div>

          <div className="ac-grid">
            {courses && courses.length > 0 ? (
              courses.map((c) => <CourseCard key={c._id} course={c} />)
            ) : (
              <div className="ac-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p>No courses yet. Add your first one →</p>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: add course form ── */}
        <div className="ac-right">
          <div className="ac-form-card">

            <div className="ac-form-header">
              <h2>Add <em>Course</em></h2>
              <p>Fill in the details to publish a new course</p>
            </div>

            <div className="ac-form-body">
              <form onSubmit={submitHandler}>

                <div className="fg">
                  <label htmlFor="ac-title">Title</label>
                  <input
                    id="ac-title"
                    type="text"
                    placeholder="e.g. React for Beginners"
                    maxLength={80}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <span className="char-count">{title.length}/80</span>
                </div>

                <div className="fg">
                  <label htmlFor="ac-desc">Description</label>
                  <input
                    id="ac-desc"
                    type="text"
                    placeholder="Short course description"
                    maxLength={160}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <span className="char-count">{description.length}/160</span>
                </div>

                <div className="fg-row">
                  <div className="fg">
                    <label htmlFor="ac-price">Price (₹)</label>
                    <input
                      id="ac-price"
                      type="number"
                      placeholder="0"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fg">
                    <label htmlFor="ac-dur">Duration (hrs)</label>
                    <input
                      id="ac-dur"
                      type="number"
                      placeholder="e.g. 12"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="fg">
                  <label htmlFor="ac-instructor">Instructor</label>
                  <input
                    id="ac-instructor"
                    type="text"
                    placeholder="Instructor name"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                  />
                </div>

                <div className="fg">
                  <label htmlFor="ac-cat">Category</label>
                  <div className="select-wrap">
                    <select
                      id="ac-cat"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option value={c} key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="fg">
                  <label>Cover Image</label>
                  {imagePrev ? (
                    <div className="ac-preview-wrap">
                      <img src={imagePrev} alt="Preview" className="ac-preview-img" />
                      <button
                        type="button"
                        className="ac-remove-img"
                        onClick={() => { setImage(""); setImagePrev(""); }}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`ac-drop-zone${isDragging ? " dragging" : ""}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={changeImageHandler}
                        required
                      />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 16l4-4 4 4 4-6 4 6" />
                        <rect x="2" y="3" width="20" height="18" rx="2" />
                      </svg>
                      <p><span>Choose file</span> or drag &amp; drop</p>
                      <small>PNG, JPG, WebP up to 5MB</small>
                    </div>
                  )}
                </div>

                <button type="submit" className="ac-submit-btn" disabled={btnLoading}>
                  {btnLoading ? (
                    <>
                      <span className="ac-spinner" /> Uploading...
                    </>
                  ) : (
                    "Add Course"
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AdminCourses;
