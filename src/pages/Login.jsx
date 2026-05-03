import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import useStore from "../store/useStore";

export default function Login() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const ok = login(email, password);
    setLoading(false);
    if (ok) {
      navigate("/dashboard");
    } else {
      setError("E-mail ou senha inválidos.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: (t) =>
          t.palette.mode === "dark"
            ? "linear-gradient(160deg, #0F1117 0%, #1a1d27 100%)"
            : "linear-gradient(160deg, #ede7f6 0%, #e3f2fd 100%)",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #5C6BC0, #26A69A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            boxShadow: "0 8px 32px rgba(92,107,192,0.4)",
          }}
        >
          <AccountBalanceRoundedIcon sx={{ color: "#fff", fontSize: 36 }} />
        </Box>
        <Typography variant="h4" fontWeight={700}>
          FinanceApp
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Controle financeiro simplificado
        </Typography>
      </Box>

      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" mb={3}>
            Entrar
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="email"
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Entrar"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
