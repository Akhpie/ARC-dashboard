import React, { useState, useEffect } from "react";
import {
  Calculator,
  Award,
  X,
  Check,
  Bell,
  AlertCircle,
  History,
  Clock,
} from "lucide-react";

type Props = {};

type Reward = {
  id: string;
  name: string;
  image: string;
  pointsRequired: number;
  description: string;
};

type Notification = {
  id: string;
  type: "success" | "error" | "info";
  message: string;
};

type RedemptionRecord = {
  id: string;
  rewardId: string;
  rewardName: string;
  pointsSpent: number;
  date: Date;
};

// Animation styles defined separately for TypeScript compatibility
const animationStyles = {
  fadeIn: {
    animation: "fadeIn 0.3s ease-out",
  },
};

const StudentRewards = (props: Props) => {
  // Current user points - in a real app, this would come from your API/backend
  const [currentPoints, setCurrentPoints] = useState<number>(3500);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [arcPoints, setArcPoints] = useState<string>("");
  const [inrValue, setInrValue] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [redemptionHistory, setRedemptionHistory] = useState<
    RedemptionRecord[]
  >([
    // Sample history data - in a real app, this would come from your API/backend
    {
      id: "h1",
      rewardId: "r4",
      rewardName: "Coffee Shop Voucher",
      pointsSpent: 1500,
      date: new Date(2025, 1, 1),
    },
    {
      id: "h2",
      rewardId: "r6",
      rewardName: "Water Bottle",
      pointsSpent: 1000,
      date: new Date(2025, 0, 15),
    },
  ]);

  // Add keyframe animation styles to document head when component mounts
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Sample rewards data
  const rewards: Reward[] = [
    {
      id: "r1",
      name: "School Hoodie",
      image: "/api/placeholder/200/150",
      pointsRequired: 5000,
      description: "Comfortable hoodie with school logo",
    },
    {
      id: "r2",
      name: "Premium Notebook Set",
      image: "/api/placeholder/200/150",
      pointsRequired: 2500,
      description: "Set of 3 premium notebooks",
    },
    {
      id: "r3",
      name: "Wireless Earbuds",
      image: "/api/placeholder/200/150",
      pointsRequired: 8000,
      description: "High-quality wireless earbuds",
    },
    {
      id: "r4",
      name: "Coffee Shop Voucher",
      image: "/api/placeholder/200/150",
      pointsRequired: 1500,
      description: "₹300 voucher for the campus coffee shop",
    },
    {
      id: "r5",
      name: "Study Lamp",
      image: "/api/placeholder/200/150",
      pointsRequired: 3000,
      description: "Adjustable LED desk lamp",
    },
    {
      id: "r6",
      name: "Water Bottle",
      image: "/api/placeholder/200/150",
      pointsRequired: 1000,
      description: "Stainless steel water bottle with school logo",
    },
  ];

  // Add notification
  const addNotification = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, type, message }]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Conversion rate: 1 ARC point = 0.2 INR (example rate)
  const convertToINR = () => {
    if (arcPoints) {
      const points = parseFloat(arcPoints);
      if (!isNaN(points)) {
        // Using 0.2 as example conversion rate
        setInrValue(points * 0.2);
        addNotification(
          "info",
          `Conversion complete: ${points} points = ₹${(points * 0.2).toFixed(
            2
          )}`
        );
      }
    }
  };

  // Determine if reward is available based on current points
  const isRewardAvailable = (pointsRequired: number) => {
    return currentPoints >= pointsRequired;
  };

  // Format date to readable string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Mock function to redeem a reward (would connect to backend in real app)
  const redeemReward = (reward: Reward) => {
    if (isRewardAvailable(reward.pointsRequired)) {
      // In a real app, you'd make an API call here
      setCurrentPoints(currentPoints - reward.pointsRequired);

      // Add to redemption history
      const newRedemption: RedemptionRecord = {
        id: `h${Date.now()}`,
        rewardId: reward.id,
        rewardName: reward.name,
        pointsSpent: reward.pointsRequired,
        date: new Date(),
      };

      setRedemptionHistory((prev) => [newRedemption, ...prev]);

      addNotification(
        "success",
        `Successfully redeemed ${reward.name}! ${reward.pointsRequired} points deducted.`
      );
    } else {
      addNotification("error", `Not enough points to redeem ${reward.name}.`);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 relative">
      {/* Notification area */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg flex items-start gap-3 ${
              notification.type === "success"
                ? "bg-green-800 text-green-100"
                : notification.type === "error"
                ? "bg-red-800 text-red-100"
                : "bg-blue-800 text-blue-100"
            }`}
            style={{ animation: "fadeIn 0.3s ease-out" }}
          >
            {notification.type === "success" && (
              <Check className="h-5 w-5 text-green-300 mt-0.5" />
            )}
            {notification.type === "error" && (
              <AlertCircle className="h-5 w-5 text-red-300 mt-0.5" />
            )}
            {notification.type === "info" && (
              <Bell className="h-5 w-5 text-blue-300 mt-0.5" />
            )}

            <div className="flex-1">
              <p>{notification.message}</p>
            </div>

            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-300 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Header section with points display */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Award className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold">Student Rewards</h1>
              <p className="text-gray-400">
                Redeem your ARC points for rewards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-end">
            {/* Current points display */}
            <div className="bg-gray-700 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-400">Current Points</p>
              <p className="text-xl font-bold text-blue-300">
                {currentPoints.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Calculator size={18} />
              <span>Points Calculator</span>
            </button>

            <button
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              <History size={18} />
              <span>Redemption History</span>
            </button>
          </div>
        </div>
      </div>

      {/* Points usage tips */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Rewards You Can Get Now</h2>
        <p className="text-gray-400 mb-4">
          With your {currentPoints.toLocaleString()} points, you can redeem:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rewards
            .filter((reward) => isRewardAvailable(reward.pointsRequired))
            .map((reward) => (
              <div
                key={`mini-${reward.id}`}
                className="bg-gray-700 rounded-lg p-3 flex items-center gap-2"
              >
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{reward.name}</span>
              </div>
            ))}

          {rewards.filter((reward) => isRewardAvailable(reward.pointsRequired))
            .length === 0 && (
            <div className="col-span-full text-gray-500 text-sm py-2">
              You don't have enough points for any rewards yet. Keep earning!
            </div>
          )}
        </div>
      </div>

      {/* Calculator Popup */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">ARC Points Calculator</h2>
              <button
                onClick={() => setIsCalculatorOpen(false)}
                className="p-1 hover:bg-gray-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-400 mb-4">
              Convert your ARC points to INR value
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Enter ARC Points
                </label>
                <input
                  type="number"
                  value={arcPoints}
                  onChange={(e) => setArcPoints(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Enter points"
                />
              </div>

              <button
                onClick={convertToINR}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
              >
                Calculate
              </button>

              {inrValue !== null && (
                <div className="mt-4 p-3 bg-gray-700 rounded-md">
                  <p className="text-sm text-gray-400">Conversion Result:</p>
                  <p className="text-lg font-semibold">
                    {arcPoints} ARC Points = ₹{inrValue.toFixed(2)} INR
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Redemption History Popup */}
      {isHistoryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <History className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold">
                  Your Redemption History
                </h2>
              </div>
              <button
                onClick={() => setIsHistoryOpen(false)}
                className="p-1 hover:bg-gray-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {redemptionHistory.length > 0 ? (
              <div className="space-y-4">
                {redemptionHistory.map((record) => {
                  // Find the reward details if available
                  const rewardDetails = rewards.find(
                    (r) => r.id === record.rewardId
                  );

                  return (
                    <div
                      key={record.id}
                      className="bg-gray-700 rounded-lg p-4 flex gap-4"
                    >
                      {/* Image if available */}
                      {rewardDetails && (
                        <div className="w-16 h-16 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={rewardDetails.image}
                            alt={record.rewardName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{record.rewardName}</h3>
                          <span className="text-blue-300 font-medium">
                            -{record.pointsSpent.toLocaleString()} points
                          </span>
                        </div>

                        <div className="flex items-center mt-2 text-gray-400 text-sm">
                          <Clock size={14} className="mr-1" />
                          <span>{formatDate(record.date)}</span>
                        </div>

                        {rewardDetails && (
                          <p className="text-gray-400 text-sm mt-1">
                            {rewardDetails.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <p className="text-gray-400 text-sm">
                    Total redeemed:{" "}
                    <span className="font-medium text-white">
                      {redemptionHistory
                        .reduce((sum, record) => sum + record.pointsSpent, 0)
                        .toLocaleString()}{" "}
                      points
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-700 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  No redemption history yet
                </h3>
                <p className="text-gray-400">
                  Redeem your first reward to start building your history.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const available = isRewardAvailable(reward.pointsRequired);
          return (
            <div
              key={reward.id}
              className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all ${
                available
                  ? "ring-2 ring-green-500 ring-opacity-50"
                  : "opacity-80"
              }`}
            >
              <div className="h-48 bg-gray-700 flex items-center justify-center relative">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="h-full w-full object-cover"
                />
                {available && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Check size={12} />
                    <span>Available</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{reward.name}</h3>
                  <div
                    className={`${
                      available
                        ? "bg-green-900 text-green-300"
                        : "bg-blue-900 text-blue-300"
                    } font-medium px-3 py-1 rounded-full text-sm`}
                  >
                    {reward.pointsRequired.toLocaleString()} pts
                  </div>
                </div>

                <p className="text-gray-400 mt-2 text-sm">
                  {reward.description}
                </p>

                {available ? (
                  <button
                    onClick={() => redeemReward(reward)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Redeem Now
                  </button>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      disabled
                      className="w-full bg-gray-700 text-gray-400 font-medium py-2 px-4 rounded-md cursor-not-allowed"
                    >
                      Not Enough Points
                    </button>
                    <p className="text-xs text-center text-gray-500">
                      You need{" "}
                      {(reward.pointsRequired - currentPoints).toLocaleString()}{" "}
                      more points
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentRewards;
