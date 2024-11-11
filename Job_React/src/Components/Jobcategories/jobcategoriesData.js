function JobTypes({ title, image }) {

  return (

    <div className="job-card">
      <div className="job-card-content">
        <img src={image}></img>
        <h2 className="job-title">{title}</h2>
      </div>
    </div>

  )
}

export default JobTypes;