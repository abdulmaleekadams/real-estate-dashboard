interface sectionTitleProps {
  sectionTitle: string;
}

const SectionTitle = ({ sectionTitle }: sectionTitleProps) => {
  return <h2 className="sectionTitle">{sectionTitle}</h2>;
};

export default SectionTitle;
