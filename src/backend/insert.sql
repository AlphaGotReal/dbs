use dbsproject;

/* inserting agents first... */
INSERT INTO Agent VALUES (1, 'john_doe', 'john@example.com');
INSERT INTO Agent VALUES (2, 'jane_smith', 'jane@example.com');
INSERT INTO Agent VALUES (3, 'bob_jones', 'bob@example.com');
INSERT INTO Agent VALUES (4, 'emily_williams', 'emily@example.com');
INSERT INTO Agent VALUES (5, 'david_brown', 'david@example.com');
INSERT INTO Agent VALUES (6, 'sarah_taylor', 'sarah@example.com');
INSERT INTO Agent VALUES (7, 'michael_jackson', 'michael@example.com');
INSERT INTO Agent VALUES (8, 'laura_johnson', 'laura@example.com');

/* insert the properties then... */
INSERT INTO Property VALUES (1, 'House', '123 Main St', 'Anytown', 'NY', '12345', 2000.00, 250000.00, 'Cozy family home', true, 1);
INSERT INTO Property VALUES (2, 'Apartment', '456 Elm St', 'Smallville', 'CA', '54321', 1000.00, 1500.00, 'Modern downtown apartment', true, 2);
INSERT INTO Property VALUES (3, 'Condo', '789 Oak St', 'Metro City', 'TX', '98765', 1500.00, 200000.00, 'Luxury waterfront condo', false, 3);
INSERT INTO Property VALUES (4, 'House', '321 Maple St', 'Rural Town', 'FL', '67890', 2500.00, 300000.00, 'Spacious countryside retreat', true, 4);
INSERT INTO Property VALUES (5, 'Townhouse', '555 Pine St', 'Suburbia', 'IL', '13579', 1800.00, 220000.00, 'Family-friendly neighborhood', true, 5);
INSERT INTO Property VALUES (6, 'Duplex', '777 Walnut St', 'City Heights', 'WA', '24680', 2200.00, 350000.00, 'Income-generating investment', false, 6);
INSERT INTO Property VALUES (7, 'Studio', '999 Cedar St', 'Downtown', 'MA', '10101', 800.00, 1000.00, 'Compact urban living', true, 7);
INSERT INTO Property VALUES (8, 'Vacant Land', '111 River Rd', 'Wilderness', 'OR', '11223', 5000.00, 50000.00, 'Untouched natural beauty', true, 8);

/* insert images */
INSERT INTO Image VALUES (101, 1, 'https://cdn.discordapp.com/attachments/792656939573313546/1230250012748021912/image.png?ex=6632a29b&is=66202d9b&hm=6e942884da9419c7441156fa6658a06ed768f217167ef3508a28d41e66866305&');
INSERT INTO Image VALUES (102, 2, 'https://cdn.discordapp.com/attachments/792656939573313546/1230250057119432714/image.png?ex=6632a2a6&is=66202da6&hm=2b737eefabfda31dc72f8a5b6d5604f1a827c83ff888ce38aae134d98125e12a&');
INSERT INTO Image VALUES (103, 3, 'https://cdn.discordapp.com/attachments/792656939573313546/1230250121690742856/image.png?ex=6632a2b5&is=66202db5&hm=016e7eb63caeb0f8d96a77ab4ce064e280a5175816e559d0e151456f03116bb0&');
INSERT INTO Image VALUES (104, 4, 'https://cdn.discordapp.com/attachments/792656939573313546/1230250227743850597/image.png?ex=6632a2cf&is=66202dcf&hm=43cec49c498f96bd0b716f61bffea90dcba87708816ab6c579e3878281028e24&');
INSERT INTO Image VALUES (105, 5, 'https://cdn.discordapp.com/attachments/792656939573313546/1230250291455332486/image.png?ex=6632a2de&is=66202dde&hm=7cefdf30c46c78832c3402de64e57e291555b5ca2c6fedb287edcce318e40386&');
INSERT INTO Image VALUES (106, 6, 'https://cdn.discordapp.com/attachments/792656939573313546/1230250365862281306/image.png?ex=6632a2f0&is=66202df0&hm=1cb8c06952ceb9c4667f7aecdfb0914fe1e960e57bcc28d642bf1b781f96458f&');
INSERT INTO Image VALUES (107, 7, 'https://cdn.discordapp.com/attachments/792656939573313546/1230250435043131524/image.png?ex=6632a300&is=66202e00&hm=602784f07e3fb5c23478dbad615e616c475e7167b9faf5e8b0459979bf52db9c&');
INSERT INTO Image VALUES (108, 8, 'https://cdn.discordapp.com/attachments/792656939573313546/1230250516538331196/image.png?ex=6632a314&is=66202e14&hm=89b3d5a4bfaf83da63a0f29ec5fce9259867e8eb9b47cb0476fb08dffecf752b&');

/* insert features */
INSERT INTO PropertyFeatures VALUES (201, 1, 'swimming pool');
INSERT INTO PropertyFeatures VALUES (202, 2, 'garden');
INSERT INTO PropertyFeatures VALUES (203, 3, 'helipad');
INSERT INTO PropertyFeatures VALUES (204, 4, 'swimming pool');
INSERT INTO PropertyFeatures VALUES (205, 5, 'golf yard');
INSERT INTO PropertyFeatures VALUES (206, 6, 'park');
INSERT INTO PropertyFeatures VALUES (207, 7, 'gym');
INSERT INTO PropertyFeatures VALUES (208, 8, 'party hall');

/* insert categories */
INSERT INTO PropertyCategories VALUES (1, 'Single Family Home', 1);
INSERT INTO PropertyCategories VALUES (2, 'Apartment', 2);
INSERT INTO PropertyCategories VALUES (3, 'Condominium', 3);
INSERT INTO PropertyCategories VALUES (4, 'Single Family Home', 4);
INSERT INTO PropertyCategories VALUES (5, 'Townhouse', 5);
INSERT INTO PropertyCategories VALUES (6, 'Multi-Family Home', 6);
INSERT INTO PropertyCategories VALUES (7, 'Apartment', 7);
INSERT INTO PropertyCategories VALUES (8, 'Vacant Land', 8);

/* insert ratings */
INSERT INTO PropertyRatings VALUES (1, 1, 4, 'Great location and spacious rooms.', '2024-04-01');
INSERT INTO PropertyRatings VALUES (2, 2, 5, 'Excellent amenities and friendly neighbors.', '2024-04-02');
INSERT INTO PropertyRatings VALUES (3, 3, 3, 'Average condo, needs some maintenance.', '2024-04-03');
INSERT INTO PropertyRatings VALUES (4, 4, 4, 'Beautiful house, quiet neighborhood.', '2024-04-04');
INSERT INTO PropertyRatings VALUES (5, 5, 4, 'Nice townhouse, close to schools.', '2024-04-05');
INSERT INTO PropertyRatings VALUES (6, 6, 2, 'Duplex needs renovation, not recommended.', '2024-04-06');
INSERT INTO PropertyRatings VALUES (7, 7, 5, 'Studio apartment is perfect for singles.', '2024-04-07');
INSERT INTO PropertyRatings VALUES (8, 8, 3, 'Nice land but needs clearing.', '2024-04-08');


