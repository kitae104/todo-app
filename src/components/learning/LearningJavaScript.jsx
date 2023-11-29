const person = {
  name: "Kim Ki-Tae",
  address: {
    city: "Incheon",
    country: "South Korea",
  },
  profiles: ['Software Engineer', 'Full Stack Developer', 'Frontend Engineer'],
  printProfile: () => {
    person.profiles.map(
      (profile) => {
        console.log(profile);
      }
    );    
  },
};

export default function LearningJavaScript() {
  return (
    <>
      <div>{person.name}</div>
      <div>{person.address.city}</div>
      <div>{person.profiles[0]}</div>
      <div>{person.printProfile()}</div>
    </>
  );
}
