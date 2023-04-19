// Material UI элементы
import { Container } from "@mui/material";

// Типизация пропсов
interface NotFoundPageProps {};

export const NotFoundPage = ({}: NotFoundPageProps) => {
  
  return(
    <Container>
      <h5>Страница не найдена</h5>
    </Container>
  )
};