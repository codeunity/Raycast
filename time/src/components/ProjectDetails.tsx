import { Detail, List } from "@raycast/api";
import { Project } from "../types/Project";

const moneyString = (value: number | null) =>
  `${Number(value ?? 0).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`;
type ProjectDetailsProps = {
  project: Project;
};

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <List.Item.Detail
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Name" text={project.name} />
          <Detail.Metadata.Label title="Description" text={project.description} />
          {project.city && (
            <>
              <Detail.Metadata.Separator />
              <Detail.Metadata.Label title="Address" />
              <Detail.Metadata.Label title="City" text={project.city} />
              <Detail.Metadata.Label title="Street" text={project.street} />
              <Detail.Metadata.Label title="Postal Code" text={project.postalCode} />
            </>
          )}
          {project.progress.progress && (
            <>
              <Detail.Metadata.Separator />
              <Detail.Metadata.Label title="Progress" />
              {project.progress.offerAmount && (
                <Detail.Metadata.Label title="Offer amount" text={moneyString(project.progress.offerAmount)} />
              )}
              <Detail.Metadata.Label title="Remote" text={`${project.progress.totalTimeRemote?.toFixed(0)}h`} />
              <Detail.Metadata.Label title="On site" text={`${project.progress.totalTimeOnSite?.toFixed(0)}h`} />
            </>
          )}
        </Detail.Metadata>
      }
    />
  );
};
