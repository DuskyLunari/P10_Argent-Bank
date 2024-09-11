import React from "react";
import { Layout } from "../components/Layout.jsx";
import { Checking } from "../components/Account.jsx";

export function Profile() {
  return (
    <Layout>
     <main class="main bg-dark">
      <div class="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button class="edit-button">Edit Name</button>
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