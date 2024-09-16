import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout.jsx";
import { Checking } from "../components/Checking.jsx";
import { getUser } from "../redux/features/profile/profile.actions.js";

export function Profile() {
  const dispatch = useDispatch();

  const { firstName, lastName, isLoading, errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <Layout>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back<br />
            {firstName} {lastName}!
          </h1>
          <button className="edit-button">Edit Name</button>
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