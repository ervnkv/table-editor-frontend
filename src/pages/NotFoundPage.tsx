// Material UI элементы
import { Container } from "@mui/material";
import { useTranslation } from 'react-i18next';

// Типизация пропсов
interface NotFoundPageProps {};

export const NotFoundPage = ({}: NotFoundPageProps) => {
  const {t} = useTranslation("errors");
  return(
    <Container>
      <h5>{t("notFound_error")}</h5>
    </Container>
  )
};