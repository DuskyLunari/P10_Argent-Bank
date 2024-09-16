import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout.jsx";
import { Checking } from "../components/Checking.jsx";
import { getUser, editUser } from "../redux/features/profile/profile.actions.js";

export function Profile() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editableUserName, setEditableUserName] = useState("");

  const { firstName, lastName, userName, isLoading, errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setEditableUserName(userName);
  }, [userName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editUser({ userName: editableUserName }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

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
                  <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h1>
                Welcome back<br />
                {firstName} {lastName}!
              </h1>
              <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
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