import "/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "/utils/authOptions";
import Nav from "/components/Nav";
import Provider from "/components/Provider";

export const metadata = {
  title: "Gimmer",
  description: "Discover & Share AI",
};

const RootLayout = async ({ children }) => {
  // Fetch session data server-side using getServerSession
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-50">
        {/* Pass the session to the Provider component */}
        <Provider session={session}>
          {/* Main content wrapper */}
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1 pt-16"> {/* Added padding-top for navbar height */}
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
