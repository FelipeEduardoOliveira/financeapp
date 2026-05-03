import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import {
  Science,
  WarningAmber,
  Storage,
  PersonOutline,
  LockOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";

const InfoRow = ({ icon, label, value, valueColor }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      py: 1.2,
      px: 2,
      borderRadius: 3,
      bgcolor: "action.hover",
    }}
  >
    <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
    <Box flex={1}>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        lineHeight={1.2}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={700}
        sx={{
          color: valueColor || "text.primary",
          fontFamily: "monospace",
          fontSize: "0.85rem",
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

export default function WelcomeModal({ open, onAccept, onDecline }) {
  return (
    <Dialog
      open={open}
      onClose={onDecline}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          mx: 2,
          overflow: "hidden",
        },
      }}
    >
      {/* Colored top bar */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #00C896 0%, #007AFF 100%)",
          py: 3,
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Science sx={{ fontSize: 30, color: "#fff" }} />
        </Box>
        <Typography
          variant="h6"
          sx={{ color: "#fff", fontWeight: 800, textAlign: "center" }}
        >
          Ambiente de Testes
        </Typography>
        <Chip
          label="BETA"
          size="small"
          sx={{
            bgcolor: "rgba(255,255,255,0.25)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.7rem",
            letterSpacing: 1,
          }}
        />
      </Box>

      <DialogContent sx={{ px: 3, pt: 3, pb: 2 }}>
        {/* Warning */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            p: 2,
            borderRadius: 3,
            bgcolor: "#FFF3CD",
            border: "1px solid #FFE082",
            mb: 3,
          }}
        >
          <WarningAmber sx={{ color: "#F57C00", mt: 0.2, flexShrink: 0 }} />
          <Typography
            variant="body2"
            sx={{ color: "#7B4F00", lineHeight: 1.6 }}
          >
            Este é um projeto em fase de testes.{" "}
            <strong>Não insira dados pessoais ou financeiros reais.</strong>{" "}
            Todas as informações são fictícias e para fins de demonstração.
          </Typography>
        </Box>

        {/* Access credentials */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={700}
          mb={1.5}
        >
          SUAS CREDENCIAIS DE ACESSO
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} mb={3}>
          <InfoRow
            icon={<PersonOutline fontSize="small" />}
            label="E-mail de acesso"
            value="nome@teste.com"
            valueColor="primary.main"
          />
          <InfoRow
            icon={<LockOutlined fontSize="small" />}
            label="Senha"
            value="123456"
            valueColor="primary.main"
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Storage info */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            p: 2,
            borderRadius: 3,
            bgcolor: "action.hover",
            mb: 3,
          }}
        >
          <Storage sx={{ color: "text.secondary", mt: 0.2, flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
            Todos os dados inseridos neste app são{" "}
            <strong>salvos apenas no seu navegador</strong> via{" "}
            <code
              style={{
                fontSize: "0.8em",
                background: "rgba(0,0,0,0.08)",
                padding: "1px 5px",
                borderRadius: 4,
              }}
            >
              localStorage
            </code>
            . Não há nenhuma API ou banco de dados real envolvido.
          </Typography>
        </Box>

        {/* Actions */}
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<CheckCircleOutline />}
            onClick={onAccept}
            sx={{
              height: 50,
              background: "linear-gradient(90deg, #00C896, #007AFF)",
              fontSize: "0.95rem",
            }}
          >
            Entendi, quero continuar
          </Button>
        </Box>

        <Typography
          variant="caption"
          color="text.disabled"
          display="block"
          textAlign="center"
          mt={2}
        >
          Ao aceitar, este aviso não será exibido novamente neste dispositivo.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
