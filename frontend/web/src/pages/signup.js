import React, {useState, useEffect} from "react";
import styles from "@/pages/PagesStyles/signup.module.css";
import {useRouter} from "next/router";
import PostRegister from "@/Utils/Request/PostRegister";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const Signup = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const backUrl = process.env.NEXT_PUBLIC_BACK_LOCALHOST;
  const frontUrl = process.env.NEXT_PUBLIC_WEB_LOCALHOST;

  const handleRegister = async () => {
    if (!isFormValid) {
      return;
    }

    const formData = {
      email,
      password,
      surname,
      lastname,
    };

    try {
      const response = await PostRegister(formData);
      toast.success("Registration successful!");
      router.push(`/?access_token=${response.access_token}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const {access_token} = router.query;

    if (access_token) {
      router.push(`/?access_token=${response.access_token}`);
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
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.formContainer}>
        <div className={styles.signUpContent}>
          <div className={styles.signUpTitle}>Sign up</div>
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="text"
                className={styles.inputField}
                placeholder={"Enter your email"}
                value={email}
                onChange={handleEmailChange}
                style={{
                  borderColor: emailError
                    ? "#FF0054"
                    : "rgba(102, 102, 102, 0.35)",
                }}
              />
              {emailError && (
                <div style={{ color: "#FF0054", marginTop: "8px" }}>
                  {emailError}
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>{"Your password"}</label>
              <input
                type="password"
                className={styles.inputField}
                placeholder={"Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Surname</label>
              <input
                type="text"
                className={styles.inputField}
                placeholder={"Enter your surname"}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Lastname</label>
              <input
                type="text"
                className={styles.inputField}
                placeholder={"Enter your lastname"}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <button className={styles.continueButton} onClick={handleRegister}>
            Continue
          </button>
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

          <div
            style={{
              width: "100%",
              maxWidth: 568,
              height: 44,
              padding: "15px 10%",
              background: "#FDFFFC",
              borderRadius: 40,
              border: "1px #011627 solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              paddingLeft: 6,
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
              paddingLeft: 6,
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
                width="900"
                height="900"
              />
              <div className={styles.oAuth2ButtonText}>
                Continue with Microsoft
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
