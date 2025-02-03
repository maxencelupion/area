import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import styles from "@/pages/PagesStyles/login.module.css";
import PostLogin from "@/Utils/Request/PostLogin";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import HeaderContents from "@/pages/Components/Utils/HeaderContents";

const Login = () => {
  const router = useRouter();
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const backUrl = process.env.NEXT_PUBLIC_BACK_LOCALHOST;
  const frontUrl = process.env.NEXT_PUBLIC_WEB_LOCALHOST;

  const handleSignIn = async () => {
    if (!isFormValid) {
      return;
    }
    try {
      const formData = isPasswordReset ? {email} : {email, password};

      const response = await PostLogin(formData);
      await router.push(`/?access_token=${response.access_token}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid login credentials. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const {access_token} = router.query;

    if (access_token) {
      router.push(`/?access_token=${access_token}`);
    }
  }, [router, router.query]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || emailRegex.test(email)) {
      setEmailError("");
      setIsFormValid(true);
    } else {
      setEmailError("Please enter a valid email address.");
      setIsFormValid(false);
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    validateEmail(inputEmail);
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className={styles.leftSide}>
        <div
          style={{
            width: "100%",
            height: "auto",
            maxWidth: 720,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <HeaderContents
            circle={true}
            content={
              "Managing multiple accounts? No problem. Connect more than one account per service to simplify your automation process."
            }
            title={"Connect multiple accounts per service"}
          />
          <Image
            style={{width: "100%", maxWidth: 563, height: "auto"}}
            src="/assets/loginpage/social-image.webp"
            alt=""
            width="583"
            height="583"
          />
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.rightContent}>
          <div
            style={{
              color: "#FF0054",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 48,
              marginRight: "85%",
            }}
          >
            {isPasswordReset ? "Reset Password" : "Login"}
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: 568,
              height: 44,
              padding: "15px 10%",
              background: "#FDFFFC",
              borderRadius: 40,
              border: "1px #011627 solid",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              paddingLeft: 16,
              paddingRight: 16,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FDFFFC")
            }
            onClick={() =>
              router.push(
                `${backUrl}/auth/google/callback?state=${frontUrl}/login`
              )
            }
          >
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                display: "flex",
              }}
            >
              <Image
                style={{width: "100%", maxWidth: 24, height: "auto"}}
                src="/assets/services/google_color.png"
                alt="Google connexion"
                width="900"
                height="900"
              />
              <div className={styles.oAuth2ButtonText}>
                Continue with Google
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: 568,
              height: 44,
              padding: "15px 10%",
              background: "#FDFFFC",
              borderRadius: 40,
              border: "1px #011627 solid",
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              paddingLeft: 16,
              paddingRight: 16,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FDFFFC")
            }
            onClick={() =>
              router.push(
                `${backUrl}/auth/microsoft/callback?state=${frontUrl}/login`
              )
            }
          >
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                display: "flex",
              }}
            >
              <Image
                style={{width: "100%", maxWidth: 24, height: "auto"}}
                src="/assets/services/microsoft_color.png"
                alt="Microsoft connexion"
                width="512"
                height="512"
              />
              <div className={styles.oAuth2ButtonText}>
                Continue with Microsoft
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: 668,
              justifyContent: "center",
              alignItems: "center",
              gap: 23,
              display: "flex",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                height: 2,
                background: "rgba(102, 102, 102, 0.25)",
              }}
            />
            <div style={{color: "#011627", fontSize: 18, fontWeight: 400}}>
              OR
            </div>
            <div
              style={{
                flex: "1 1 0",
                height: 2,
                background: "rgba(102, 102, 102, 0.25)",
              }}
            />
          </div>

          <label
            style={{
              width: "100%",
              maxWidth: 668,
              color: "#011627",
              fontSize: "1em",
              marginBottom: 4,
              fontWeight: "500",
            }}
          >
            Email address
          </label>
          <input
            type="text"
            aria-label={"email"}
            value={email}
            onChange={handleEmailChange}
            placeholder={"Enter your email"}
            style={{
              width: "100%",
              maxWidth: 668,
              height: 56,
              borderRadius: 12,
              border: `1px ${
                emailError ? "#FF0054" : "rgba(102, 102, 102, 0.35)"
              } solid`,
              paddingLeft: 16,
              marginBottom: 18,
            }}
          />
          {emailError && (
            <div style={{color: "#FF0054", marginBottom: 12}}>
              {emailError}
            </div>
          )}

          {!isPasswordReset && (
            <>
              <label
                style={{
                  width: "100%",
                  maxWidth: 668,
                  color: "#011627",
                  fontSize: 16,
                  marginBottom: 4,
                  fontWeight: "500",
                }}
              >
                Your password
              </label>
              <input
                type="password"
                aria-label={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"Enter your password"}
                style={{
                  width: "100%",
                  maxWidth: 668,
                  height: 56,
                  borderRadius: 12,
                  border: "1px rgba(102, 102, 102, 0.35) solid",
                  paddingLeft: 16,
                  marginBottom: 8,
                }}
              />
            </>
          )}

          {/* <div
            style={{
              textAlign: "right",
              color: "#FF0054",
              // fontSize: 16,
              textDecoration: "underline",
              marginBottom: 32,
              marginLeft: "70%",
              cursor: "pointer",
            }}
            onClick={() => setIsPasswordReset((prev) => !prev)}
            >
            {isPasswordReset ? "Login normally" : "Forget your password"}
            </div> */}

          <div
            className={styles.signInButton}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff3366")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF0054")
            }
            onClick={handleSignIn}
          >
            <div>Sign in</div>
          </div>

          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              gap: 10,
              marginRight: "55%",
              cursor: "pointer",
            }}
            onClick={() => router.push("/signup")}
          >
            <span style={{color: "#011627", fontSize: 16}}>
              Don’t have an account?
            </span>
            <span
              style={{
                color: "#FF0054",
                fontSize: 16,
                textDecoration: "underline",
              }}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
