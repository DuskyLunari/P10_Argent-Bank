import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout.jsx";
import { Checking } from "../components/Checking.jsx";
import { getUser, editUser } from "../redux/features/profile/profile.actions.js";
import { toggleIsEditing, updateUserName } from "../redux/features/profile/profile.slice.js";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editableUserName, setEditableUserName] = useState("");
  
  const { token } = useSelector(state => state.auth);
  const { firstName, lastName, userName, isLoading, isEditing } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(getUser({ token }));
    } else {
      navigate("/sign-in");
    }
  }, [dispatch, navigate, token]);  

  useEffect(() => {
    console.log("userName from state:", userName);
    if (isEditing && userName) {
      setEditableUserName(userName);
    }
  }, [isEditing, userName]);  

  const handleSave = () => {
    console.log("Saving userName:", editableUserName);
    dispatch(editUser({ userPayload: { userName: editableUserName }, token }))
      .then(() => {
        dispatch(updateUserName(editableUserName));
        dispatch(toggleIsEditing());
      });
  };   

  const handleEditAction = () => {
    if (isEditing) {
      setEditableUserName(userName);
      dispatch(toggleIsEditing());
    } else {
      dispatch(toggleIsEditing());
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <main className="main bg-dark">
        <div className="header">
          {isEditing ? (
            <div className="form-container">
              <h1>Edit user info</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="userName">User Name:</label>
                  <input
                    type="text"
                    id="userName"
                    value={editableUserName}
                    onChange={(e) => setEditableUserName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    className="no-edit"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    className="no-edit"
                    readOnly
                  />
                </div>
                <div className="form-buttons">
                  <button type="button" onClick={handleSave}>Save</button>
                  <button type="button" onClick={handleEditAction}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h1>
                Welcome back<br />
                {firstName} {lastName}!
              </h1>
              <button className="edit-button" onClick={handleEditAction}>Edit Name</button>
            </div>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>
        <Checking
          title="Argent Bank Checking (x8349)"
          balance="$2,082.79"
          description="Available Balance"
        />
        <Checking
          title="Argent Bank Savings (x6712)"
          balance="$10,928.42"
          description="Available Balance"
        />
        <Checking
          title="Argent Bank Credit Card (x8349)"
          balance="$184.30"
          description="Current Balance"
        />
      </main>
    </Layout>
  );
}