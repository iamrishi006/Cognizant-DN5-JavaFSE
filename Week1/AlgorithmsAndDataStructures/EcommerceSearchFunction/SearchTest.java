public class SearchTest {

    public static void main(String[] args) {

        Product[] products = {

                new Product(101, "Camera", "Electronics"),
                new Product(102, "Laptop", "Electronics"),
                new Product(103, "Mobile", "Electronics"),
                new Product(104, "Shoes", "Fashion"),
                new Product(105, "Watch", "Accessories")
        };

        Product result1 = SearchEngine.linearSearch(products, "Mobile");

        if (result1 != null) {
            System.out.println("Linear Search Found : " + result1.productName);
        }

        Product result2 = SearchEngine.binarySearch(products, "Mobile");

        if (result2 != null) {
            System.out.println("Binary Search Found : " + result2.productName);
        }
    }
}