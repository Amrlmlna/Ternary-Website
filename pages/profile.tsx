import type { NextPage } from "next";
import UserProfile from "../components/UserProfile";
import Head from "next/head";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profil Pengguna - Ternary Premium</title>
        <meta
          name="description"
          content="Kelola profil dan pengaturan akun Anda di Ternary Premium"
        />
      </Head>
      <UserProfile />
    </>
  );
};

export default Profile;
