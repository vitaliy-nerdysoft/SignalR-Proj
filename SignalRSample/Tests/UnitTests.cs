using Xunit;
using FluentAssertions;

namespace SignalRSample.Tests
{
    public class UnitTests
    {
        [Theory]
        [InlineData(2)]
        [InlineData(8)]
        [InlineData(888)]
        public void IsEvenTests_EvenNumbers_Successfull(int number)
        {
            HelperClass.IsEven(number).Should().BeTrue();
        }

        [Theory]
        [InlineData(5)]
        [InlineData(13)]
        [InlineData(559)]
        public void IsEvenTests_OddNumbers_Successfull(int number)
        {
            HelperClass.IsEven(number).Should().BeFalse();
        }
    }
}
