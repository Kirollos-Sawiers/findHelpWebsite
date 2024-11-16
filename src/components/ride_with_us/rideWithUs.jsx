import React from "react";
import Navbar from "../Navbar";
import Container from "react-bootstrap/Container";
import ride_cover from "../../assets/ride_cover.png";
import rideWithUs from "../../assets/rideWithUs.jpeg";
import partner_card_1 from "../../assets/partner_card_1.png";
import partner_card_2 from "../../assets/partner_card_2.png";
import partner_card_3 from "../../assets/partner_card_3.png";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Footer from "./../footer/footer";
import { useForm } from "react-hook-form";

function RideWithUs() {
  const imgsArray = [
    partner_card_1,
    partner_card_2,
    partner_card_3,
    partner_card_1,
    partner_card_2,
    partner_card_3,
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const Card = () => {
    return (
      <>
        <div className="flex justify-center flex-wrap">
          {imgsArray.map((imageName) => {
            return (
              <div
                key={imageName}
                className="flex flex-col items-center m-3 w-[25rem] shadow-xl rounded-lg"
              >
                <Image className="w-[25rem] h-auto" src={imageName} />
                <div className="flex flex-col items-center my-3 p-3">
                  <p className="font-bold">Forem ipsum</p>
                  <p>
                    Morem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  // Function to open the link in a new tab
  const openGooglePlayLink = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.extreme.find_help_delivery_app",
      "_blank"
    );
  };

  return (
    <Container fluid className="p-0">
      <Navbar />
      <Container fluid className="p-0 mb-5">
        <div>
          <Image
            className="w-[100%] h-fit shadow-lg"
            src={rideWithUs}
            alt="Ride with us cover"
            onClick={openGooglePlayLink} // Add onClick to open the link in a new tab
            style={{ cursor: "pointer" }} // Add pointer cursor to indicate it's clickable
          />
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <p className="text-3xl font-bold">Why partner with Find Help?</p>
          <p className="font-semibold">
            We believe in the power of choice. That’s why we offer a range of
            products, services, and delivery options to help you grow your
            business on your terms.
          </p>
        </div>
        <div>
          <Card />
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <p className="text-7xl font-bold">FAQ</p>
          <div className="w-2/3">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>ماهى فايند هلب؟</Accordion.Header>
                <Accordion.Body>
                  فايندهلب عبارة عن شركة رائدة تقوم بربط العملاء مع خدماتهم
                  المفضلة عبر الانترنت نحن نقدم طريقة سهلة وسريعة لربط العملاء
                  بمطاعمهم ومتاجرهم وجميع خدماتهم المفضلة. كل ما يتطلبه الأمر،
                  هو خطوات بسيطة وسهلة بإستخدام الكومبيوتر الشخصي أو جوالك أو
                  حتى جهازك اللوحي من أجل اختيار طلبك المفضل عن طريق فايندهلب.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>ماذا نفعل؟</Accordion.Header>
                <Accordion.Body>
                  نحن نقوم ببساطة بإستلام الطلب المقدم منكم وارساله الى المطعم
                  أو المتجر من خلال برنامج متصل بين فايندهلب وبين المطعم أو
                  المتجر، ولذلك لا يتعين عليك التعامل مع متاعب تقديم الطلب عن
                  طريق الهاتف، ونحن نتأكد من استلامك لطلبك في الوقت المحدد.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>لماذا استخدم فايندهلب؟</Accordion.Header>
                <Accordion.Body>
                  فايندهلب هي ملتقى ضخم للعديد من الخدمات والمتاجر والمطاعم،
                  ولذلك أنت لست بحاجة للمرور بمتاعب تذكر أرقام مقدمى الخدمات أو
                  المتاجر أو المطاعم والإنتظار على الهاتف أو الحصول على رد مشغول
                  عند إدارة المتجرأو المطعم أو الحصول على الطلب الخطأ بسبب خطأ
                  في الإتصال عبر الهاتف. وبجانب ذلك، عن طريق إستخدام فايندهلب
                  يمكنك مشاهدة القوائم الخدمات والمتاجر والمطاعم وصور المنتجات
                  وصور لكافة الاماكن المفضلة عبر موقعنا على الشبكة بطريقة سهلة
                  وبسيطة.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  ماهى التكلفة عند إستخدام تطبيق فايندهلب؟
                </Accordion.Header>
                <Accordion.Body>
                  .التكلفة الإضافية الوحيدة التى يمكن إضافتها لقيمة الطلب تتعلق
                  فقط برسوم التوصيل للمتجرأوالمطعم أما الخدمات فى تقدم بدون رسوم
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  هل لديكم خدمات بطاقة الدفع المسبق / بطاقات الائتمان؟
                </Accordion.Header>
                <Accordion.Body>
                  نعم٫ معظم المتاجر والمطاعم في فايندهلب تقدم خدمة الدفع اون
                  لاين بإستخدام بطاقة الائتمان \ الدفع المسبق. - ماستركارد /
                  فيزا / الكي نت / فورى
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  هل لديكم عروض خاصة على موقعكم على الشبكة؟
                </Accordion.Header>
                <Accordion.Body>
                  نعم. يمكنكم الإطلاع على أحدث عروض المتاجروالمطاعم عن طريق
                  ايقونه أفضل العروض في الصفحة الرئيسية.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  كيف اقدم الطلب من خلال فايندهلب؟
                </Accordion.Header>
                <Accordion.Body>
                  <h3>تعليمات الطلب</h3>
                  <ol>
                    <li>
                      في البداية، يمكنك الطلب كعضو مسجل من قبل أو كعضو جديد.{" "}
                      <a href="/signup">اضغط هنا للتسجيل</a>
                    </li>
                    <li>
                      اختار الدولة التى تقيم بها ثم ادخل رقم الهاتف اختار
                      المنطقة التي تقيم فيها (العنوان) واضغط على "تفعيل"
                    </li>
                    <li>
                      اختار مطعمك المفضل من القائمة بالضغط على الاسم أو الشعار.
                    </li>
                    <li>
                      اختيار البند وأضف الرقم بالكمية التي تريدها بجانب الصنف ثم
                      أضغط على (أضف للسلة).
                    </li>
                    <li>لإستعراض كافة قائمتك اضغط على عرض سلة المشتريات.</li>
                    <li>
                      تأكد من صحة كافة المعلومات ثم اضغط على "الدفع" لتنفيذ
                      طلبك. أكد موقعك ثم اختار نوع الدفع ثم أضغط على "اطلب"
                    </li>
                    <li>سوف يتم توجيه طلبك الى (مقدم الخدمة) فورا.</li>
                    <li>
                      يجب الملاحظة إنه في حالة قيامك بإستخدام خدمتنا، سوف نقوم
                      بالإتصال برقم هاتفك النقال بهدف التأكد من بيانات طلبك.
                    </li>
                  </ol>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  إيه هو عداد الوقت التنازلي اللي بيظهر لما المطعم يقبل الطلب ؟
                </Accordion.Header>
                <Accordion.Body>
                  عند تأكيد الطلب على تطبيق فايند هلب سواء كان أندرويد أو IOS
                  سيتم الإنتقال تلقائي لشاشة تفاصيل الطلب لمعرفة الوقت المتوقع
                  لوصول الطلب، "عداد وقت التوصيل " يوضح تأكيد إستلام الطلب من
                  المطعم و بدأ تحضير الطلب و يوضح الوقت المتوقع لوصول الطلب ،
                  يختلف وقت التحضير من مطعم الي آخر طبقًا للوقت المتوقع لتحضير
                  الطلب من قبل المطعم أو المتجر وسعة وقدرة المطعم أو المتجر في
                  وقت إستلام الطلب.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>
                  طلبي اتلغى ، فلوسي هترجع أمتى ؟
                </Accordion.Header>
                <Accordion.Body>
                  في حالة الدفع أون لاين فايند هلب لا تحصل قيمة الطلب فور تأكيد
                  العملية أنما يقوم البنك بالتحصيل من حسابك أولاً حتى يتأكد من
                  إتمام العملية ومن ثم يقوم بتحصيلها لحساب فايند هلب حين يتم
                  تأكيد العملية. في حالات الإلغاء يحصل البنك قيمة الطلب من حسابك
                  ويسترد المبلغ مرة أخرى إلى الحساب في معظم الأوقات يكون خلال 24
                  ساعة بناء عى سياسة البنك التابع له حسابك ومع ذلك في بعض
                  الحالات ترد خلال 7 أيام عمل وذلك لأن في هذة الحالات تقوم فايند
                  هلب بأرسال طلب إسترداد قيمة الطلب الملغي لحساب المستخدم ويقدم
                  الطلب للبنك التابع لبطاقة العميل التي تم الخصم منها. في حالة
                  وجود اي إستفسار يرجى مراسلتنا على info@findhelpapp.com
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9">
                <Accordion.Header>
                  إذا قمت بتقديم طلب، ماهي المدة المطلوبة لإستلام الطلب؟
                </Accordion.Header>
                <Accordion.Body>
                  يعتمد ذلك على سياسة مقدمى الخدمات، ويعتمد كذلك على بعد موقعك
                  عن المتجر أو المطعم، عادة يستغرق التوصيل في الظروف المعتادة 45
                  دقيقة، ومع ذلك قد تصل المدة إلى ساعة واحدة للتوصيل بناء على
                  المرور والإختناقات على الطرق.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="10">
                <Accordion.Header>ازاي الغي طلبي ؟</Accordion.Header>
                <Accordion.Body>
                  ألغاء الطلب بعد تأكيده من العميل بيكون عن طريق التواصل مع خدمة
                  عملاء فايند هلب عن طريق المحادثة الفورية بالابلكيشن، أما فى
                  حالة عدم التأكيد للطلب يقوم العميل بالدخول على تفاصيل الطلب
                  ويتم إلغاؤه تلقائيًا.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="11">
                <Accordion.Header>
                  لقد قمت بتقديم طلب الآن ولكنني غير متأكد إذا كنتم قد قمتم
                  بإستلامه. ماذا أفعل؟
                </Accordion.Header>
                <Accordion.Body>
                  أذهب إلى "حسابي" ثم أضغط على "طلباتي" لرؤية إذا كان قد تم
                  توجيه طلبك بنجاح أم لا. كما يمكنك إستخدام المحادثة المباشرة
                  للإستعلام عن وضع طلبك.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="12">
                <Accordion.Header>
                  هل يمكنني إعادة تقديم طلب سابق؟
                </Accordion.Header>
                <Accordion.Body>
                  نعم يمكنك ذلك، يمكنك التوجه ببساطة إلى شاشة "طلباتى" من صفحة
                  "حسابي" وإختيار الطلب من القائمة ثم نضغط على "أعد الطلب".
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="13">
                <Accordion.Header>
                  إزاي اقدر أكتب تعليق للمطعم وأنا بطلب؟
                </Accordion.Header>
                <Accordion.Body>
                  بعد الإنتهاء من تحديد العنوان أو الموقع يوجد خانة ملاحظات "أضف
                  ملاحظاتك إلى طلبك" ثم نضغط على "الدفع"
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="14">
                <Accordion.Header>
                  هل أستطيع أن أطلب أكثر من طلب من أكثر من مطعم؟
                </Accordion.Header>
                <Accordion.Body>
                  نعم تقدر تطلب أكثر من طلب من أماكن مختلفة في نفس الوقت، وقت
                  التوصيل هيختلف ورسوم التوصيل بتعتمد على مقدم الخدمة سواء كان
                  مطعم أو متجر أو خدمات .
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="15">
                <Accordion.Header>
                  إزاي اقدر أستخدم كود الخصم والتخفيضات؟
                </Accordion.Header>
                <Accordion.Body>
                  بعد ما تحدد العنوان وطريقة الدفع لطلبك فى خانة أسمها "كود
                  الخصم" دخل الكود و وأضغط على "تطبيق" يظهر الخصم مع ملخص الدفع
                  بالأسفل.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="16">
                <Accordion.Header>الكود لا يعمل؟</Accordion.Header>
                <Accordion.Body>
                  <ol>
                    <li>
                      تأكد أنك لم تستخدم الكود من قبل وذلك لأن في بعض الأوقات
                      إستخدام الكود بيكون لمرة واحدة فقط.
                    </li>
                    <li>
                      تأكد من إدخال الكود بالشكل الصحيح كما هوه معلن عنه من قبل
                      فايند هلب.
                    </li>
                  </ol>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </Container>
      <Footer />
    </Container>
  );
}

export default RideWithUs;
