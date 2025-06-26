import Layout from "@/Layouts/Layout";

const AboutUs = () => {
  return (
    <Layout>
      <section className="bg-gradient-to-r from-amber-50 to-orange-300 py-10 px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Map */}
          <div className="w-full lg:w-1/2">
            <iframe
              className="rounded-xl w-full h-[300px] lg:h-[450px] shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112083.64852786028!2d77.06377248494194!3d28.611354047667078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f0e953711f%3A0x844a573e77077c2a!2sPizza%20Hut!5e0!3m2!1sen!2sin!4v1730005874176!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text">
              About Us
            </h2>
            <p className="mt-6 text-xl text-[#6B7280] leading-relaxed">
              At Pizza Hut, we’re passionate about delivering the perfect pizza
              experience. From our signature pan pizzas to our famous stuffed
              crust, each pie is made with high-quality ingredients and crafted
              to satisfy. We offer a variety of menu options, including wings,
              pasta, sides, and desserts, all designed to complement our pizzas.
              With convenient dine-in, takeaway, and delivery services, Pizza Hut
              makes it easy to enjoy a delicious meal anytime, anywhere. Our
              commitment to flavor, freshness, and great deals ensures every order
              is a satisfying experience for friends, families, and pizza lovers
              alike.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
