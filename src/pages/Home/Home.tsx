import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import { Section } from "../../App";

const BANNER_HEIGHT = 50;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: ${theme.margin.x3}px;
`;

const Title = styled.h1`
  text-align: center;
  color: ${theme.color.white};
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.elevation_01};
  border-radius: 4px;
  margin-top: ${theme.margin.x3}px;
  padding: ${theme.margin.x3}px;
`;

const DescriptionTitle = styled.h2`
  margin-top: 0px;
  margin-bottom: ${theme.margin.x1}px;
  color: ${theme.color.white};
`;

const DescriptionText = styled.p`
  color: ${theme.color.white};
  white-space: pre-line;
`;

const Link = styled.a`
  color: ${theme.color.primary};
  font-weight: bold;
`;

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${theme.margin.x2}px;
`;

const SectionText = styled.h3`
  text-align: center;
  color: ${theme.color.primary};
  cursor: pointer;
`;

const BottomBanner = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  height: ${BANNER_HEIGHT}px;
  width: 100%;
  background-color: ${theme.color.elevation_01};
  padding-left: ${theme.margin.x3}px;
  border-top: 1px solid ${theme.color.elevation_00};
`;

const BottomBannerText = styled.p`
  color: ${theme.color.white};
`;

interface Props {
  changeSection: (id: number | null) => void;
  sections: Section[];
}

export const Home: FunctionComponent<Props> = ({ changeSection, sections }) => (
  <div style={{ marginBottom: BANNER_HEIGHT }}>
    <Container>
      <Title>Bienvenue sur Recettes Temporis V</Title>
      <DescriptionContainer>
        <DescriptionTitle>
          <b>Présentation</b>
        </DescriptionTitle>
        <DescriptionText>
          Le serveur Temporis V est un serveur temporaire du MMORPG{" "}
          <Link href="https://www.dofus.com">Dofus</Link>.{"\n\n"}Ce serveur
          dure du 21 avril au 22 juin 2021. Comme à chaque Temporis, des règles
          spéciales sont ajoutées au jeu. Pour plus d'informations, n'hésite pas
          à consulter la{" "}
          <Link href="https://www.dofus.com/fr/mmorpg/actualites/news/1313032-temporis-v-faq?refreshcache">
            FAQ
          </Link>
          .{"\n\n"}
          Ce site a pour but d'aider pour le Chinq : les équipements,
          consommables et idoles sont obtenables contre cinq cartes différentes.
          Chaque combinaison de cinq cartes donne un objet selon des recettes à
          découvrir. Tu pourras trouver sur ce site des recettes déjà connues,
          soit en cherchant le nom d'un item que tu veux, soit avec les cartes
          que tu as en ta possession.{"\n\n"}Bien sûr, n'hésite pas à aider les
          autres joueurs en ajoutant les recettes que tu trouves !
        </DescriptionText>
      </DescriptionContainer>
      <DescriptionContainer>
        <DescriptionTitle>
          <b>Les outils</b>
        </DescriptionTitle>
        <DescriptionText>
          Ces quatre outils proposés par ce site vous serviront pour le Chinq :
        </DescriptionText>
        <SectionContainer>
          {sections.map((section, index) => (
            <SectionText onClick={() => changeSection(index)}>
              {section.label}
            </SectionText>
          ))}
        </SectionContainer>
        <DescriptionText>Fais-en bon usage !</DescriptionText>
      </DescriptionContainer>
      <DescriptionContainer>
        <DescriptionTitle>Derrière le site</DescriptionTitle>
        <DescriptionText>
          Le code source de ce site est disponible sur un{" "}
          <Link href="https://github.com/voisinhugo/TemporisV-Recipes">
            repository GitHub
          </Link>
          . Le site est hébergé via le service GitHub Pages.{"\n\n"}Je tenais
          aussi à remercier le site communautaire{" "}
          <Link href="https://chinq.fr/">chinq.fr</Link> qui me fournit la liste
          des objects obtenables et la liste des cartes de Temporis V.
        </DescriptionText>
      </DescriptionContainer>
    </Container>
    <BottomBanner>
      <BottomBannerText>
        Ceci est un site communautaire non affilié à Ankama Games - Contact :
        hpvoisin2[at]gmail.com
      </BottomBannerText>
    </BottomBanner>
  </div>
);
