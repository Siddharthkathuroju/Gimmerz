import "/styles/globals.css";
import { getServerSession } from "next-auth";  // Import getServerSession to fetch the session
import { authOptions } from "/utils/authOptions";  // Your auth options file
import Nav from "/components/Nav";
import Provider from "/components/Provider";
import Sidebar from "/components/sidebar";
export const metadata = {
  title: "Gimmer",
  description: "Discover & Share AI",
};

const RootLayout = async ({ children }) => {
  // Fetch session data server-side using getServerSession
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        {/* Pass the session to the Provider component */}
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Sidebar />
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
