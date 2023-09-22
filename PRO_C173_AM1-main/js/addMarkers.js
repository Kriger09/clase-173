AFRAME.registerComponent("create-markers", {
  init: async function () {
    var mainScene = document.querySelector("#main-scene");
    var dishes = await this.getDishes();
    dishes.map(dish => {
      var marker = document.createElement("a-marker");
      marker.setAttribute("id", dish.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", dish.marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);

      // Obtener el día actual
      var todaysDate = new Date();
      var todaysDay = todaysDate.getDay();
      // Domingo - Sábado : 0 - 6
      var days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];

      if (!dish.unavailable_days.includes(days[todaysDay])) {
        // Agregar modelos 3D a la escena
        var model = document.createElement("a-entity");
        model.setAttribute("id", `model-${dish.id}`);
        model.setAttribute("position", dish.position);
        model.setAttribute("rotation", dish.rotation);
        model.setAttribute("scale", dish.scale);
        model.setAttribute("gltf-model", `url(${dish.model_url})`);
        model.setAttribute("gesture-handler", {});
        model.setAttribute("visible", false);
        marker.appendChild(model);

        // Contenedor de ingredientes
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${dish.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        mainPlane.setAttribute("visible", false);
        marker.appendChild(mainPlane);

        // Plano de fondo del título del platillo
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${dish.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);

        // Título del platillo
        var dishTitle = document.createElement("a-entity");
        dishTitle.setAttribute("id", `dish-title-${dish.id}`);
        dishTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        dishTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        dishTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: dish.nombre.toUpperCase()
        });
        titlePlane.appendChild(dishTitle);

        // Lista de ingredientes
        var ingredients = document.createElement("a-entity");
        ingredients.setAttribute("id", `ingredients-${dish.id}`);
        ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        ingredients.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${dish.ingredientes.join("\n\n")}`
        });
        mainPlane.appendChild(ingredients);

        // Precio del platillo
        var pricePlane = document.createElement("a-image");
        pricePlane.setAttribute("id", `price-plane-${dish.id}`);
        pricePlane.setAttribute(
          "src",
          "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
        );
        pricePlane.setAttribute("width", 0.8);
        pricePlane.setAttribute("height", 0.8);
        pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
        pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        pricePlane.setAttribute("visible", false);

        var price = document.createElement("a-entity");
        price.setAttribute("id", `price-${dish.id}`);
        price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
        price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        price.setAttribute("text", {
          font: "mozillavr",
          color: "white",
          width: 3,
          align: "center",
          value: `Only\n $${dish.price}`
        });

        pricePlane.appendChild(price);
        marker.appendChild(pricePlane);
        
        // Plano de la calificación del platillo
        var ratingPlane = document.createElement("a-entity");
        ratingPlane.setAttribute("id", `rating-plane-${dish.id}`);
        ratingPlane.setAttribute("position", { x: 2, y: 0, z: 0.5 });
        ratingPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        ratingPlane.setAttribute("geometry", {
          primitive:"plane",
          width: 1.5,
          height:0.3,
        });
        ratingPlane.setAttribute("material", { color: "#F0C30F" });
        ratingPlane.setAttribute("visible", false);


        // Calificaciones
        var rating = document.createElement("a-entity");
        rating.setAttribute("id", `rating-${dish.id}`);
        rating.setAttribute("position", { x: 0, y: 0.05, z: 0.1 });
        rating.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        rating.setAttribute("text", {
          font: "mozillavr",
          color: "black",
          width: 2.5,
          align: "center",
          value: `Calificación del cliente: $${dish.last_rating}`
        });

        ratingPlane.appendChild(rating)
        marker.appendChild(ratingPlane)

        // Plano de la reseña del platillo
        var feedbackPlane = document.createElement("a-entity");
        feedbackPlane.setAttribute("id", `feedback-plane-${dish.id}`);
        feedbackPlane.setAttribute("position", { x: 2, y: 0, z: 0});
        feedbackPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        feedbackPlane.setAttribute("geometry", {
          primitive:"plane",
          width: 1.5,
          height:0.5,
        });
        feedbackPlane.setAttribute("material", { color: "#F0C30F" });
        feedbackPlane.setAttribute("visible", false);
       
        // Reseña del platillo
        var feedback = document.createElement("a-entity");
        feedback.setAttribute("id", `feedback-${dish.id}`);
        feedback.setAttribute("position", { x: 0, y: 0.05, z: 0.1 });
        feedback.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        feedback.setAttribute("text", {
          font: "mozillavr",
          color: "black",
          width: 2.5,
          align: `Reseña del cliente: $${dish.last_review}`
        });

        feedbackPlane.appendChild(feedback)
        marker.appendChild(feedbackPlane)

      }
    });
  },
  getDishes: async function () {
    return await firebase
      .firestore()
      .collection("dishes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});