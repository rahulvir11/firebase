const {admin,db,productCollection} = require("../../../configs/serviceAccount");
const Product = require("../../model/product");
const User = require("../../model/user");

exports.socialAuth = async (req, res, next) => {
    const { uid, socialType } = req.body;

    if (!uid || !socialType || !['google', 'facebook'].includes(socialType)) {
        return res.status(400).send({ message: 'Invalid details' });
    }

    try {
        // Map socialType to the provider
        const providerMap = {
            google: 'google.com',
            facebook: 'facebook.com'
        };

        const providerId = providerMap[socialType];
        let userAccessDetails;

        // Fetch user details from the provider
        userAccessDetails = await admin.auth().getUserByProviderUid(providerId, uid);

        if (!userAccessDetails) {
            return res.status(400).send({ message: 'User access details not found' });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email: userAccessDetails.email });
        let responseToSend = null;

        if (existingUser) {
            // Existing user response
            responseToSend = {
                name: existingUser.name,
                email: existingUser.email,
                profilePic: existingUser.profilePic,
                uid: uid
            };
        } else {
            // Create a new user
            let newUser = await User.create({
                name: userAccessDetails.displayName,
                email: userAccessDetails.email,
                profilePic: userAccessDetails.photoURL,
                password: `${Math.random().toString(36).substr(2, 8)}`,
                uid: uid,
                oAuthType:providerId,
                createdAt: Date.now()
            });

            responseToSend = {
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                uid: uid
            };
        }

        return res.status(200).send({ message: 'User login successfully', data: responseToSend });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message, status: 500 });
    }
};


exports.addProduct = async (req, res, next) => {
    const { data } = req.body;
    try {
        const insert=await Product.create({
            ...data
        })
        return res.status(200).send({ data: insert, message: "successfull", status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message, status: 500 });
    }
}
exports.add = async (req, res, next) => {
    const { id } = req.body; // Extract `id` from the request body
  
    try {
     
      const docRef = db.collection("products").doc(id); // Fetch the document snapshot
      const docSnapshot = await docRef.get(); // Fetch the document snapshot
  
      if (docSnapshot.exists) {
        const data = docSnapshot.data(); // Extract document data
        // console.log("Document data:", data);
  
        return res.status(200).send({
          data,
          message: "Document fetched successfully",
          status: 200,
        });
      } else {
        console.log("Document does not exist");
  
        return res.status(404).send({
          message: "Document not found",
          status: 404,
        });
      }
    } catch (error) {
      console.error("Error fetching document:", error);
  
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
        status: 500,
      });
    }
  };
  
  