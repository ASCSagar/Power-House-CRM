import React from "react";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";

const NeedHelp = () => {
  return (
    <body>
      <main id="main" className="main">
        <Breadcrumbs title="Need Help" main="Dashboard" />
        <section className="section faq">
          <div className="row">
            <div className="col-lg-12">
              <div className="card basic">
                <div className="card-body">
                  <h5 className="card-title">Basic Questions</h5>
                  <div>
                    <h6>
                      1. Nisi ut ut exercitationem voluptatem esse sunt rerum?
                    </h6>
                    <p>
                      Saepe perspiciatis ea. Incidunt blanditiis enim mollitia
                      qui voluptates. Id rem nulla tenetur nihil in unde rerum.
                      Quae consequatur placeat qui cumque earum eius omnis quos.
                    </p>
                  </div>

                  <div className="pt-2">
                    <h6>2. Reiciendis dolores repudiandae?</h6>
                    <p>
                      Id ipsam non ut. Placeat doloremque deserunt quia tenetur
                      inventore laboriosam dolores totam odio. Aperiam incidunt
                      et. Totam ut quos sunt atque modi molestiae dolorem.
                    </p>
                  </div>

                  <div className="pt-2">
                    <h6>
                      3. Qui qui reprehenderit ut est illo numquam voluptatem?
                    </h6>
                    <p>
                      Enim inventore in consequuntur ipsam voluptatem
                      consequatur beatae. Nostrum consequuntur voluptates et
                      blanditiis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
};

export default NeedHelp;
